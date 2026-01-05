import AFRAME from 'aframe'
// const THREE = window.AFRAME.THREE;
import {globalWorkerRef} from '@ucl-nuee/rapier-worker'

AFRAME.registerComponent('rapier-open-close-gripper', {
  schema: {
    // unique: {type: 'string', default: ''},
    // hand: {type: 'string', default: 'nova2Sucker'},
    // object: {type: 'string', default: 'cylinder1'},
  },
  init: function() {
    const handArgs = []; 
    const handSpeed = [-0.06, 0.12]; // [close, open]
    if (this.el.id === 'jaka-plane') {
      handArgs[0] = 'jakaHandJL';
      handArgs[1] = 'jakaHandJR';
    } else if (this.el.id === 'rapier-controller') {
      handArgs[0] = 'handJoint1';
      handArgs[1] = 'handJoint2';
      handSpeed[0] = -0.5;
      handSpeed[1] = 0.5;
    }
    // JAKA or RedBlock gripper
    const closer = (evt) => { // CLOSE
      const args = {};
      handArgs.forEach(v=>args[v]= handSpeed[0]);
      globalWorkerRef?.current?.postMessage({
        type: 'call',
        name: 'mapVeloc',
	args: args
      })
    };
    const opener = (evt) => { // OPEN
      const args = {};
      handArgs.forEach(v=>args[v]= handSpeed[1]);
      globalWorkerRef?.current?.postMessage({
        type: 'call',
        name: 'mapVeloc',
	args: args
      })
    };
    this.el.addEventListener('abuttondown', closer);
    this.el.addEventListener('xbuttondown', closer);
    this.el.addEventListener('bbuttondown', opener);
    this.el.addEventListener('ybuttondown', opener);
  },
});
AFRAME.registerComponent('rapier-fix-by-sucker', {
  schema: {
    // unique: {type: 'string', default: ''},
    hand: {type: 'string', default: 'nova2Sucker'},
    // object: {type: 'string', default: 'cylinder1'},
  },
  init: function() {
    this.el.addEventListener('gripdown', (evt) => { // FIX
      globalWorkerRef?.current?.postMessage({
        type: 'call',
	name: 'rayCastFix',
	args: { name: this.data.hand },
      });
    });
    this.el.addEventListener('gripup', (evt) => { // RELEASE
      globalWorkerRef?.current?.postMessage({
        type: 'call',
        name: 'clearFixedRB',
	args: { name: this.data.hand },
      });
    });
  },
});
