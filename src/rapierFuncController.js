import AFRAME from 'aframe'
// const THREE = window.AFRAME.THREE;
import {globalWorkerRef} from '@ucl-nuee/rapier-worker'

AFRAME.registerComponent('rapier-func-controller', {
  schema: {
    prefix: {type: 'string', default: ''}, // prepend this to callee func name. e.g. 'jakaHand'
    arg: {type: 'array' }, // argに与えるObjectのkeyの一覧
    value: {type: 'array' }, // argに与えるObjectのvalueの一覧。数値に変換される
    // rapierObjectUtils.jsに機能追加して全joint名等のarrayを取り出せるようにする。
    // joint名からprefixにマッチするjointを取り出す
  },
  init: function() {
    this.el.addEventListener('thumbmenu-select', (evt) => {
      const menuText = evt.detail?.texts[evt.detail?.index];
      console.log('### menu select event:', evt.detail.index,
		  'text:', menuText);
      switch (menuText) {
      case 'open':
        globalWorkerRef?.current?.postMessage({
          type: 'call',
          name: 'mapVeloc',
	  arg: {jakaHandJL: 0.02, jakaHandJR: 0.02}
        })
        break;
      case 'close':
        globalWorkerRef?.current?.postMessage({
          type: 'call',
          name: 'mapVeloc',
	  arg: {jakaHandJL: -0.06, jakaHandJR: -0.06}
        });
        break;
      case 'act':
        globalWorkerRef?.current?.postMessage({
          type: 'activate',
          name: 'box1Translation',
        });
        break;
      case 'deact':
        globalWorkerRef?.current?.postMessage({
          type: 'deactivate',
          name: 'box1Translation',
        });
        break;
      }
    });
  },
  tick: function() {
    if (!this.registered) {
      const robotRegistry = this.el.sceneEl.robotRegistryComp;
      // const robotRegistry = document.getElementById('robot-registry');
      if (robotRegistry) {
	robotRegistry.add(this.data.robotId, {el: this.el, axes: []});
	this.registered = true;
      }
    }
  },
  remove: function() {
    if (this.registered) {
      const robotRegistry = this.el.sceneEl.robotRegistryComp;
      // const robotRegistry = document.getElementById('robot-registry');
      if (robotRegistry) {
	robotRegistry.remove(this.data.robotId);
	this.registered = false;
      }
    }
  }
});
