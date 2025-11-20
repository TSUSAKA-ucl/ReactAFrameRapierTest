// ********
// ********
import AFRAME from 'aframe';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js'; // with thumbMenuEventHandler
import '@ucl-nuee/robot-loader/axesFrame.js';


export default VrControllerComponents;

function VrControllerComponents() {
  const menuItems1 = "nova2-plane,ur5e,rapier,deact,jaka-plane,g1l-unitree-l-arm,ray,g1r-unitree-r-arm";
  const menuItems2 = "nova2-plane,k3lit-kinova,rapier,g1l-unitree-l-arm,jaka-plane,g1l-unitree-l-arm,ray,kinova-gen3";

  return (
    <>
      <a-entity right-controller
                laser-controls="hand: right"
                raycaster="objects: .clickable"
                line="color: blue; opacity: 0.75"
                thumbstick-menu={`items: ${menuItems1}`}
                thumbmenu-event-handler
                target-selector
                event-distributor
                visible="true">
        <a-entity a-axes-frame="length: 0.1" />
      </a-entity>
      <a-entity left-controller
                laser-controls="hand: left"
                thumbstick-menu={`items: ${menuItems2}`}
                thumbmenu-event-handler
                target-selector
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
