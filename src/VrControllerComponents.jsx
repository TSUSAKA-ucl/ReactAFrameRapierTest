// ********
// ********
import AFRAME from 'aframe';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js'; // with thumbMenuEventHandler
import './rapierSelector.js';
import '@ucl-nuee/robot-loader/axesFrame.js';


export default VrControllerComponents;

function VrControllerComponents() {
  const menuItems = "nova2-plane,release,rapier,deact,jaka-plane,open,ray,fix";

  return (
    <>
      <a-entity right-controller
                laser-controls="hand: right"
                raycaster="objects: .clickable"
                line="color: blue; opacity: 0.75"
                thumbstick-menu={`items: ${menuItems}`}
                thumbmenu-event-handler
                target-selector
                rapier-selector
                event-distributor
                visible="true">
        <a-entity a-axes-frame="length: 0.1" />
      </a-entity>
      <a-entity left-controller
                laser-controls="hand: left"
                thumbstick-menu={`items: ${menuItems}`}
                thumbmenu-event-handler
                target-selector
                rapier-selector
                event-distributor
                visible="true">
        <a-entity a-axes-frame="length: 0.1" />
      </a-entity>
      <a-entity cursor="rayOrigin: mouse"
                mouse-cursor
                raycaster="objects: .clickable"></a-entity>

    </>
  );
}
