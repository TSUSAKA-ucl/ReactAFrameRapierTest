import AFRAME from 'aframe'
// const THREE = window.AFRAME.THREE;
import {globalWorkerRef} from '@ucl-nuee/rapier-worker'

AFRAME.registerComponent('rapier-fix-two-objects', {
  schema: {
    unique: {type: 'string', default: ''},
    hand: {type: 'string', default: 'nova2Sucker'},
    object: {type: 'string', default: 'cylinder1'},
  },
  init: function() {
    const fixId = this.data.unique ? this.data.unique :
	  // use ramdom string
	  'fix-' + Math.random().toString(36).slice(2,7);
    this.el.addEventListener('gripdown', (evt) => {
      globalWorkerRef?.current?.postMessage({
        type: 'fix',
	name: fixId,
        bodyA: this.data.hand,
	bodyB: this.data.object,
      });
    });
    this.el.addEventListener('gripup', (evt) => {
      globalWorkerRef?.current?.postMessage({
        type: 'release',
        name: fixId,
      });
    });
  },
});
