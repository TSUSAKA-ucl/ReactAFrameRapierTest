// import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import VrControllerComponents from './VrControllerComponents.jsx';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';
import './fingerCloser.js';

// ****************
// the entry point
// :
function App() {
  return (
    <a-scene xr-mode-ui="XRMode: xr" >
      <a-entity id="robot-registry"
                robot-registry >
        <VrControllerComponents />
      </a-entity>
      <a-entity camera position="-0.5 1.2 1.2"
                look-controls="enabled: false"></a-entity>

      <a-plane id="unitree-g1-torso"
               position="0.0 0.2 -0.5" rotation="-90 0 110"
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
               width="0.4" height="0.4" color="red"
      >
        <a-plane id="g1r-unitree-r-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-right"
                 ik-worker={`${0}, ${0}, ${0}, ${0}, ${0}, 0, 0`}
                 reflect-worker-joints
                 attach-event-broadcaster
                 arm-motion-ui
        >
          <a-circle id="g1rt-unitree-r-thumb"
                    robot-loader="model: g1-right-thumb"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer="stationaryJoints: 0; closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1ri-unitree-r-index"
                    robot-loader="model: g1-right-index"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1rm-unitree-r-middle"
                    robot-loader="model: g1-right-middle"
                    attach-to-another="to: g1r-unitree-r-arm"
                    finger-closer
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
        </a-plane>

        <a-plane id="g1l-unitree-l-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-left"
                 ik-worker={`${0}, ${0}, ${0}, ${0}, ${0}, 0, 0`}
                 reflect-worker-joints
                 attach-event-broadcaster
                 arm-motion-ui
        >
          <a-circle id="g1lt-unitree-l-thumb"
                    robot-loader="model: g1-left-thumb"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="stationaryJoints: 0; closeMax: 45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1li-unitree-l-index"
                    robot-loader="model: g1-left-index"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
          <a-circle id="g1lm-unitree-l-middle"
                    robot-loader="model: g1-left-middle"
                    attach-to-another="to: g1l-unitree-l-arm"
                    finger-closer="closeMax: -45"
                    radius="0.03" color="blue"
                    material="opacity: 0.5; transparent: true;"
          />
        </a-plane>
      </a-plane>
    </a-scene>
  );
}
export default App
