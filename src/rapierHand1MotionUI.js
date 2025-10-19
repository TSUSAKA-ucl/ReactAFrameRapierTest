import AFRAME from 'aframe'
const THREE = window.AFRAME.THREE;
import {globalWorkerRef, globalObjectsRef} from '@ucl-nuee/rapier-worker'
import {isoInvert, isoMultiply} from './isometry3.js';

AFRAME.registerComponent('rapier-hand1-motion-ui', {
  init: function () {
    this.rigidBodyId = 'hand1';
    this.triggerdownState = false;
    // this.el.laserVisible = true;
    this.vrControllerEl = null;
    this.objStartingPose = [new THREE.Vector3(0,0,0),
                            new THREE.Quaternion(0,0,0,1)];
    this.vrCtrlStartingPoseInv = [new THREE.Vector3(0,0,0),
				  new THREE.Quaternion(0,0,0,1)];
    // this.vrCtrlPrevPose = this.vrCtrlStartingPoseInv;
    this.ratio = 1;

    this.el.addEventListener('triggerdown', (evt) => {
      console.log('### trigger down event. laserVisible: ',
		  evt.detail?.originalTarget.laserVisible);
      this.vrControllerEl = evt.detail?.originalTarget;
      if (!this.vrControllerEl.laserVisible) {
	if (!this.triggerdownState) {
	  this.triggerdownState = true;

	  const activeCamera = this.el.sceneEl?.camera;
	  const cameraPosition = new THREE.Vector3();
	  activeCamera.getWorldPosition(cameraPosition);

	  const movingObj = globalObjectsRef.current[this.rigidBodyId];
	  let distance1 = 1;
	  let distance2 = 1;
	  if (movingObj) {
	    const movingObjPosition = movingObj.object3D.position.clone();
	    this.objStartingPose = [movingObjPosition,
				    movingObj.object3D.quaternion.clone()];
	    distance1 = cameraPosition.distanceTo(movingObjPosition);
	  }
	  const ctrlEl = this.vrControllerEl;
	  if (ctrlEl) {
	    const vrCtrlPosition = ctrlEl.object3D.position;
	    const vrCtrlPose = [vrCtrlPosition,
				ctrlEl.object3D.quaternion];
	    this.vrCtrlStartingPoseInv = isoInvert(vrCtrlPose);
	    distance2 = cameraPosition.distanceTo(vrCtrlPosition);
	  }
	  this.ratio = distance1/distance2;
	}
      }
    });
    this.el.addEventListener('triggerup', (evt) => {
      console.log('### trigger up event');
      this.vrControllerEl = evt.detail?.originalTarget;
      this.triggerdownState = false;
    });
  },
  tick: function () {
    if (!this.el?.shouldListenEvents) return;
    const ctrlEl = this.vrControllerEl;
    if (!ctrlEl) return;
    // controllerPosition = ctrlEl.object3D.position;
    // controllerQuaternion = ctrlEl.object3D.quaternion;
    if (!globalObjectsRef) {
      console.warn('globalObjectsRef not ready yet.');
      return;
    }
    const movingObj = globalObjectsRef.current[this.rigidBodyId];
    if (!movingObj) {
      console.warn('object',this.rigidBodyId,'not found');
      return;
    }
    if (this.triggerdownState && !ctrlEl.laserVisible) {
      const vrControllerPose = 	[ctrlEl.object3D.position,
				 ctrlEl.object3D.quaternion];
      const vrControllerDelta = isoMultiply(this.vrCtrlStartingPoseInv,
                                            vrControllerPose);
      vrControllerDelta[0] = vrControllerDelta[0].multiplyScalar(this.ratio);
      vrControllerDelta[1].normalize();
      const vrCtrlToObj = [new THREE.Vector3(0, 0, 0),
                           this.vrCtrlStartingPoseInv[1].clone()
                           .multiply(this.objStartingPose[1])];
      const ObjToVrCtrl = [new THREE.Vector3(0, 0, 0),
                           vrCtrlToObj[1].clone().conjugate()];
      const newObjPose = isoMultiply(isoMultiply(this.objStartingPose,
                                                 isoMultiply(ObjToVrCtrl,
                                                             vrControllerDelta)),
                                     vrCtrlToObj);
      globalWorkerRef?.current?.postMessage({
        type: 'setNextPose',
        id: this.rigidBodyId,
	pose: [...newObjPose[0].toArray(), ...newObjPose[1].toArray()]
      });
    }
  }

});
