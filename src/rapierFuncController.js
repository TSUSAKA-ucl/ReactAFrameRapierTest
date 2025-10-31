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
    this.handIsOpen = true;
    this.box1active = true;
    const handArgs = []; 
    const handSpeed = [-0.06, 0.12]; // [close, open]
    if (this.el.id === 'jaka-plane') {
      handArgs[0] = 'jakaHandJL';
      handArgs[1] = 'jakaHandJR';
    } else if (this.el.id === 'nova2-plane') {
      // handArgs ['nova2HandJL', 'nova2HandJR'];
    } else if (this.el.id === 'rapier-controller') {
      handArgs[0] = 'handJoint1';
      handArgs[1] = 'handJoint2';
      handSpeed[0] = -0.5;
      handSpeed[1] = 0.5;
    }
    this.el.addEventListener('thumbmenu-select', (evt) => {
      const menuText = evt.detail?.texts[evt.detail?.index];
      console.log('### menu select event:', evt.detail.index,
		  'text:', menuText);
      switch (menuText) {
      case 'open': {
	const args = {};
	if (this.handIsOpen) {
	  handArgs.forEach(v=>args[v]= handSpeed[0]);
	  this.handIsOpen = false;
	} else {
	  handArgs.forEach(v=>args[v]= handSpeed[1]);
	  this.handIsOpen = true;
	}
        globalWorkerRef?.current?.postMessage({
          type: 'call',
          name: 'mapVeloc',
	  args: args
        })
      } break;
      case 'suck': // fix
        globalWorkerRef?.current?.postMessage({
          type: 'fix',
	  name: 'fix-nova2Hand',
          bodyA: 'nova2Sucker',
	  bodyB: 'cylinder1'
        });
        break;
      case 'release': // release
        globalWorkerRef?.current?.postMessage({
          type: 'release',
          name: 'fix-nova2Hand',
        });
        break;
      case 'deact':
	if (this.box1active) {
          globalWorkerRef?.current?.postMessage({
            type: 'deactivate',
            name: 'box1Translation',
          });
	  this.box1active = false;
	} else {
          globalWorkerRef?.current?.postMessage({
            type: 'activate',
            name: 'box1Translation',
          });
	  this.box1active = true;
	}
        break;
      }
    });
  },
});
