import AFRAME from 'aframe'
const THREE = window.AFRAME.THREE;
import {globalObjectsRef, globalDestinationsRef} from '@ucl-nuee/rapier-worker'
import {isoInvert, isoMultiply} from './isometry3.js';

AFRAME.registerComponent('rapier-jaka-hand-width', {
  schema: {
    rapierHandL: {type: 'string', default: 'jakaHandL'},
    rapierHandR: {type: 'string', default: 'jakaHandR'},
    aframeHandL: {type: 'string', default: 'jaka-hand1-a'},
    aframeHandR: {type: 'string', default: 'jaka-hand1-b'},
  },
  init: function() {
    this.fingerLength = 0.055;
    // console.warn('XXXXXXXXXXXXXXXX initializing rapier-jaka-hand-width');
    this.consoleTimeDelta = 0;
  },
  tick: function(time, timeDelta) {
    this.consoleTimeDelta += timeDelta;
    if (this?.el?.sceneEl) {
      const handL = this.data.rapierHandL;
      const handR = this.data.rapierHandR;
      const handLEl = document.getElementById(this.data.aframeHandL);
      const handREl = document.getElementById(this.data.aframeHandR);
      if (globalObjectsRef?.current[handL] &&
	  globalObjectsRef?.current[handR] &&
	  globalDestinationsRef?.current[handL] &&
	  globalDestinationsRef?.current[handR] &&
	  handLEl && handREl) {
	const p1 = globalDestinationsRef.current[handL];
	const p2 = globalDestinationsRef.current[handR];
	const isometry1 = [new THREE.Vector3(p1[0], p1[1], p1[2]),
			   new THREE.Quaternion(p1[4], p1[5], p1[6], p1[3])];
	const isometry2 = [new THREE.Vector3(p2[0], p2[1], p2[2]),
			   new THREE.Quaternion(p2[4], p2[5], p2[6], p2[3])];
	const isoDiff = isoMultiply(isoInvert(isometry1),
				    isometry2);
	const halfWidth = isoDiff[0].length()/2 - 0.005;
	const angle1 = Math.acos(halfWidth/this.fingerLength) + 0.2;
	const angle2 = Math.PI/2 - angle1;
	const jointValues = [angle1, angle2];
	const axesListL = handLEl.axes;
	const axesListR = handREl.axes;
	if (axesListL && axesListR) {
	  axesListL.map((axisEl, idx)=> {
            const axis = axisEl.axis;
            axisEl.object3D.setRotationFromAxisAngle(axis,
						     jointValues[idx]);
	  });
	  axesListR.map((axisEl, idx)=> {
            const axis = axisEl.axis;
            axisEl.object3D.setRotationFromAxisAngle(axis,
						     jointValues[idx]);
	  });
	  // if (this.consoleTimeDelta > 250.0) {
	  //   console.log('axisEl setRotation jv:', jointValues);
	  // }
	}
	if (this.consoleTimeDelta > 250.0) {
	  // console.log('handLEl',handLEl, '  handREl',handREl);
	  // console.log('diff:',isoDiff[0],'halfWidth:', halfWidth,'angle1,2:',`${angle1} ${angle2}`);
	  // console.log('globalDestinationsRef:',globalDestinationsRef.current);
	  this.consoleTimeDelta = 0;
	}
      }
    }
  }
});
