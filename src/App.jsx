// import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import VrControllerComponents from './VrControllerComponents.jsx';
import ButtonUI from './ButtonUI.jsx';
import './rapierHand1MotionUI.js';
import './rapierRigidbodyAttach.js';
import './rapierFuncController.js';
import './rapierFixTwoObjects.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
// import './eventForwarder.js';
import './attachToAnother.js';

// ****************
// the entry point
// :
function App() {
  const deg30 = Math.PI / 6.0;
  const deg90 = Math.PI/2;
  const deg67 = Math.PI*3/8;
  const deg45 = Math.PI/4;
  const deg22 = Math.PI/8;
  return (
    <a-scene xr-mode-ui="XRMode: ar">
      <a-entity id="robot-registry"
                robot-registry >
        <VrControllerComponents />
      </a-entity>
      <a-entity camera position="-0.5 1.2 1.7"
                look-controls="enabled: false"></a-entity>

      <ButtonUI />
      {/* <a-cylinder position="1.25 0.2 -0.75" */}
      {/*             radius="0.12" height="0.4" color="#FFC65D" */}
      {/*             material="opacity: 0.35; transparent: true"> */}
      {/* </a-cylinder> */}

      <a-entity
        id="rapier-controller"
        rapier-register
        rapier-hand1-motion-ui
        rapier-func-controller
      />

      <a-circle id="jaka-hand1-a"
                robot-loader="model: jaka_hand_A"
                set-joints-directly-in-degree="60, 30"
                attach-to-another="to: jaka-plane"

                position="0.25 0.5 -2" rotation="-90 0 90"
                radius="0.03"
                color="blue"
                material="opacity: 0.5; transparent: true;"
      />
      <a-circle id="jaka-hand1-b"
                robot-loader="model: jaka_hand_B"
                set-joints-directly-in-degree="60, 30"
                attach-to-another="to: jaka-plane"

                position="0.25 0.5 -2" rotation="-90 0 90"
                radius="0.03"
                color="blue"
                material="opacity: 0.5; transparent: true;"
      />
      <a-plane id="jaka-plane"
               robot-loader="model: jaka_zu_5"
               position="0 0.0 -1.25" rotation="-90 0 90"
               width="2" height="2" color="lightcoral"
               material="opacity: 0.15; transparent: true; side: double;"
               ik-worker={`${deg22}, ${deg67}, ${-deg67}, ${deg90}, ${deg90}, 0`}
               reflect-worker-joints
               arm-motion-ui
               rapier-rigidbody-attach="rigidBody: jakaHand; position: 0 0 0.0; quaternion: 0 0 0 1"
               rapier-func-controller
               /* event-forwarder="destination: jaka-hand1-a; events: robot-registered" */
               /* event-forwarder="destination: jaka-hand1-b; events: robot-registered" */
      />
      <a-plane id="nova2-plane"
               position="-1.0 0.0 -1.0" rotation="-90 0 90"
               width="2" height="2" color="beige"
               material="opacity: 0.15; transparent: true; side: double;"
               robot-loader="model: nova2_robot"
               ik-worker={`${deg90}, ${-deg90}, ${deg90}, 0, ${-deg90}, 0`}
               reflect-worker-joints
               arm-motion-ui
               rapier-rigidbody-attach="rigidBody: nova2Sucker; position: 0 0 0.21; quaternion: 0.707107 0 0 0.707107"
               rapier-func-controller
               rapier-fix-two-objects="hand: nova2Sucker; object: cylinder1"
      />
      {/* <a-sky color="#ECECEC"></a-sky> */}
    </a-scene>
  );
}
// set-joints-directly={`${deg22}, ${deg30}, ${-deg45}, 0, ${-deg90}, 0`}
// -0.7 0.1 -0.5
export default App
