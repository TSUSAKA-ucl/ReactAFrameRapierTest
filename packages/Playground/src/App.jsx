// import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import VrControllerComponents from './VrControllerComponents.jsx';
import ButtonUI from './ButtonUI.jsx';
import './rapierHand1MotionUI.js';
import './rapierRigidbodyAttach.js';
import './rapierFuncController.js';
import './rapierGripperSucker.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/ik-cd-worker/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';
import './jakaHandPoseRapier.js';
import './addFrameToJoints.js';
import './fingerCloser.js';
import './VerticalControls.js';

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
    <a-scene xr-mode-ui="XRMode: xr"
	     keyboard-shortcuts="enterVR: false"
    >
      <a-entity id="robot-registry"
                robot-registry >
        <VrControllerComponents />
      </a-entity>
      <a-entity camera position="-0.5 1.2 1.2"
		wasd-controls="acceleration: 20; maxSpeed: 0.05; fly: true"
                vertical-controls
                look-controls></a-entity>

      {/* <ButtonUI /> */}

      {/* <a-entity */}
      {/*   id="rapier-controller" */}
      {/*   rapier-register */}
      {/*   rapier-hand1-motion-ui */}
      {/*   rapier-func-controller */}
      {/*   rapier-open-close-gripper */}
      {/* /> */}

      {/* <a-circle id="jaka-hand1-a" */}
      {/*           robot-loader="model: jaka_hand_A" */}
      {/*           /\* set-joints-directly-in-degree="60, 30" *\/ */}
      {/*           attach-to-another="to: jaka-plane" */}

      {/*           position="0.25 0.5 -2" rotation="-90 0 90" */}
      {/*           radius="0.03" */}
      {/*           color="blue" */}
      {/*           material="opacity: 0.5; transparent: true;" */}
      {/* /> */}
      {/* <a-circle id="jaka-hand1-b" */}
      {/*           robot-loader="model: jaka_hand_B" */}
      {/*           /\* set-joints-directly-in-degree="60, 30" *\/ */}
      {/*           attach-to-another="to: jaka-plane" */}

      {/*           position="0.25 0.5 -2" rotation="-90 0 90" */}
      {/*           radius="0.03" */}
      {/*           color="blue" */}
      {/*           material="opacity: 0.5; transparent: true;" */}
      {/* /> */}
      {/* <a-plane id="jaka-plane" */}
      {/*          robot-loader="model: jaka_zu_5" */}
      {/*          position="0 0.0 -1.25" rotation="-90 0 90" */}
      {/*          width="0.02" height="0.02" color="lightcoral" */}
      {/*          material="opacity: 0.15; transparent: true; side: double;" */}
      {/*          ik-worker={`${deg22}, ${deg67}, ${-deg67}, ${deg90}, ${deg90}, 0`} */}
      {/*          reflect-worker-joints */}
      {/*          arm-motion-ui */}
      {/*          rapier-rigidbody-attach="rigidBody: jakaHand; position: 0 0 0.0; quaternion: 0 0 0 1" */}
      {/*          rapier-func-controller */}
      {/*          rapier-open-close-gripper */}
      {/*          rapier-jaka-hand-width="rapeirHandL: jakaHandL; rapeirHandR: jakaHandR; aframeHandL: jaka-hand1-a; aframeHandR: jaka-hand1-b" */}
      {/*          /\* event-forwarder="destination: jaka-hand1-a; events: robot-registered" *\/ */}
      {/*          /\* event-forwarder="destination: jaka-hand1-b; events: robot-registered" *\/ */}
      {/* /> */}
      {/* <a-plane id="nova2-plane" */}
      {/*          position="-1.0 0.0 -1.0" rotation="-90 0 90" */}
      {/*          width="0.02" height="0.02" color="beige" */}
      {/*          material="opacity: 0.15; transparent: true; side: double;" */}
      {/*          robot-loader="model: nova2_robot" */}
      {/*          ik-worker={`${deg90}, ${-deg90}, ${deg90}, 0, ${-deg90}, 0`} */}
      {/*          reflect-worker-joints */}
      {/*          arm-motion-ui */}
      {/*          rapier-rigidbody-attach="rigidBody: nova2SuckerBase; position: 0 0 0.17; quaternion: 0.707107 0 0 0.707107" */}
      {/*          rapier-func-controller */}
      {/*          rapier-fix-by-sucker="hand: nova2Sucker" */}
      {/*          base-mover */}
      {/* /> */}
      <a-plane id="kinova-gen3"
               position="-2.0 0.0 -2.0" rotation="-90 0 90"
               width="0.02" height="0.02" color="blue"
               material="opacity: 0.5; transparent: true; side: double;"
               robot-loader="model: kinova-gen3"
               ik-worker={`${0}, ${0}, ${0}, ${deg90}, ${0}, ${deg90}, 0`}
               reflect-worker-joints
               base-mover
               arm-motion-ui
      />
      {/* <a-plane id="k3lit-kinova" */}
      {/*          position="-2.0 0.0 0.0" rotation="-90 0 90" */}
      {/*          width="0.04" height="0.04" color="blue" */}
      {/*          material="opacity: 0.5; transparent: true; side: double;" */}
      {/*          robot-loader="model: kinova-gen3-lite" */}
      {/*          ik-worker={`${0}, ${0}, ${deg90}, ${0}, ${deg90}, 0`} */}
      {/*          reflect-worker-joints */}
      {/*          arm-motion-ui */}
      {/*          base-mover="velocityMax: 0.2; angularVelocityMax: 0.5" */}
      {/* /> */}
      {/* <a-plane id="ur5e" */}
      {/*          position="-1.0 0.5 -0.0" rotation="-90 0 90" */}
      {/*          width="0.04" height="0.04" color="blue" */}
      {/*          material="opacity: 0.5; transparent: true; side: double;" */}
      {/*          robot-loader="model: ur5e" */}
      {/*          add-frame-to-joints="from: 3; to: 3; length: 0.4" */}
      {/*          ik-worker={`0, ${-deg90}, ${deg90}, 0, 0, 0`} */}
      {/*          reflect-worker-joints */}
      {/*          arm-motion-ui */}
      {/*          base-mover="velocityMax: 0.2; angularVelocityMax: 0.5" */}
      {/* /> */}
    
      <a-plane id="sciurus17"
               position="0.0 -0.2 -0.5" rotation="-90 0 110"
               width="0.4" height="0.4" color="red"
      >
        <a-plane id="sciurus-l-arm"
                 position="0.0 0.0 0.0" rotation="0 0 0"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: sciurus17left"
                 ik-worker={`0, ${-deg22}, ${deg45}, ${-deg45}, ${-deg90}, ${0}, ${0}, ${0}, ${-deg22}`}
                 reflect-worker-joints
                 add-frame-to-joints="from: 0; to: 1"
                 attach-event-broadcaster
                 arm-motion-ui
                 base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
        >
        </a-plane>
        <a-plane id="sciurus-r-arm"
                 position="0.0 0.2 0.0" rotation="0 0 0"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: sciurus17right"
                 attach-to-another="to: sciurus-l-arm; axis: 1"
                 ik-worker={`${deg22}, ${-deg45}, ${deg45}, ${deg90}, ${0}, ${0}, ${0}, ${deg22}`}
                 reflect-worker-joints
                 attach-event-broadcaster
                 arm-motion-ui
        >
        </a-plane>
      </a-plane>


      <a-plane id="unitree-g1-torso"
               position="1.0 0.2 -0.5" rotation="-90 0 110"
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

      {/* <a-sky color="#ECECEC"></a-sky> */}
    </a-scene>
  );
}
// set-joints-directly={`${deg22}, ${deg30}, ${-deg45}, 0, ${-deg90}, 0`}
// -0.7 0.1 -0.5
export default App
