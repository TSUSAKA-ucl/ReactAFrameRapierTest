import AFRAME from 'aframe'

AFRAME.registerComponent('attach-to-another', {
  schema: {
    to: {type: 'string'},
  },
  init: function() {
    const onSceneLoaded = () => {
      const attachToRobot = (robot) => {
	// attach this.el to robot's endLink
	const endLink = robot?.endLink;
	if (!endLink) {
	  console.warn(`Robot ${robot.id} has no endLink to attach to.`);
	  return;
	}
	console.warn('QQQQQ endLink.hasLoaded?',endLink.hasLoaded);
	try {
	  endLink.appendChild(this.el);
	  console.warn(`QQQQQ Attached ${this.el.id} to ${robot.id}'s endLink:`,endLink);
	  this.el.removeAttribute('position');
	  this.el.removeAttribute('rotation');
	  this.el.removeAttribute('scale');
	  this.el.object3D.position.set(0, 0, 0);
	  this.el.object3D.quaternion.set(0, 0, 0, 1);
	} catch (e) {
	  console.error('appendChild failed:',e);
	}
      };
      const robotEl = document.getElementById(this.data.to);
      if (Array.isArray(robotEl?.axes) && // robot has been registered
	  robotEl.endLink) {
	attachToRobot(robotEl);
      } else if (typeof robotEl?.addEventListener === 'function') {
	robotEl.addEventListener('robot-registered', () => {
	  console.warn(`QQQQQ Received robot-registered event from ${this.data.to}`,
		     'and attaching now.');
	  // You can also check the id, axes, and endLinkEl in the event detail.
	  attachToRobot(robotEl);
	});
      } else {
	console.warn(`Cannot attach to ${this.data.to}: not found or invalid robot entity.`);
      }
    }
    // **** Wait for scene to load
    if (this.el.sceneEl.hasLoaded) {
      onSceneLoaded();
    } else {
      this.el.sceneEl.addEventListener('loaded', onSceneLoaded);
    }
  }
});
