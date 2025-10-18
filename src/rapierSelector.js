import AFRAME from 'aframe'

// This component must be attached to the same element as the
// robot-registry or vrController(thumbstick-menu) component.
AFRAME.registerComponent('rapier-selector', {
  init: function () {
    this.el.addEventListener('thumbmenu-select', (evt) => {
      console.log('### rapier-selector: thumbmenu-select event:',
		  evt.detail.index);
      let distributorEl = null;
      if (this.el.getAttribute('event-distributor')) {
	distributorEl = this.el;
      } else if (this.el.sceneEl.getAttribute('event-distributor')) {
	distributorEl = this.el.sceneEl;
      }
      const robotRegistryComp = this.el.sceneEl.robotRegistryComp;
      const menuText = evt.detail?.texts[evt.detail?.index];
      if (distributorEl && robotRegistryComp && menuText) {
	if (menuText === 'rapier') { // select rapier (rapier 'hand1')
	  console.log('### select rapier');
          robotRegistryComp.eventDeliveryOneLocation('rapier-controller', distributorEl);
	}
      }
    });
  }
});
