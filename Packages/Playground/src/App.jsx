// import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import 'aframe';
import VrControllerComponents from './VrControllerComponents.jsx';
import ButtonUI from './ButtonUI.jsx';
import './rapierHand1MotionUI.js';
import './rapierRigidbodyAttach.js';
import './rapierFuncController.js';
import './rapierGripperSucker.js';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/reflectJointLimits.js';
import '@ucl-nuee/robot-loader/reflectCollision.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';
import '@ucl-nuee/robot-loader/ChangeOpacity.js';
import '@ucl-nuee/robot-loader/fingerCloser.js';
import '@ucl-nuee/robot-loader/ignoreCollision.js';
import '@ucl-nuee/ik-cd-worker/IkWorkerParamsComponents.js';
import './jakaHandPoseRapier.js';
import './addFrameToJoints.js';
import './VerticalControls.js';
import './ChangeColorEvery3sec.js';

function toSchema (obj, separator='; ') {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => toSchema(v, ',')).join(', ');
  }
  return Object.entries(obj)
    .map(([key, value]) => `${key}: `+toSchema(value,','))
    .join(separator);
};
// ****************
// the entry point
// :
function App() {
  const deg30 = Math.PI / 6.0;
  const deg90 = Math.PI/2;
  const deg80 = 80.0/180*Math.PI;
  const deg67 = Math.PI*3/8;
  const deg45 = Math.PI/4;
  const deg22 = Math.PI/8;
  const deg10 = 10.0/180*Math.PI;
  return (
    <a-scene xr-mode-ui="XRMode: xr"
	     keyboard-shortcuts="enterVR: false"
             cd-worker-log-collision="logCollision: true"
    >
      <a-entity id="robot-registry"
                robot-registry >
        <VrControllerComponents />
      </a-entity>
      <a-entity camera position="-0.5 1.2 1.2"
		wasd-controls="acceleration: 20; maxSpeed: 0.05; fly: true"
                vertical-controls
                look-controls></a-entity>

      <ButtonUI />

      <a-entity
        id="rapier-controller"
        rapier-register
        rapier-hand1-motion-ui
        rapier-func-controller
        rapier-open-close-gripper
      />

      <a-plane id="jaka-plane"
               robot-loader="model: jaka_zu_5"
               position="0 0.0 -1.25" rotation="-90 0 90"
               width="0.02" height="0.02" color="lightcoral"
               material="opacity: 0.15; transparent: true; side: double;"
               ik-worker={`${deg22}, ${deg67}, ${-deg67}, ${deg90}, ${deg90}, 0`}
               reflect-worker-joints
               arm-motion-ui
               rapier-rigidbody-attach="rigidBody: jakaHand; position: 0 0 0.0; quaternion: 0 0 0 1"
               rapier-func-controller
               rapier-open-close-gripper
               rapier-jaka-hand-width="rapeirHandL: jakaHandL; rapeirHandR: jakaHandR; aframeHandL: jaka-hand1-a; aframeHandR: jaka-hand1-b"
               /* change-color-every-3sec="colorList: red, original, blue, original, orange, original; interval: 5000" */
               /* attach-color-recursively="color: red" */
        >
        <a-circle id="jaka-hand1-a"
                  robot-loader="model: jaka_hand_A"
                  /* set-joints-directly-in-degree="60, 30" */
                  attach-to-another="to: jaka-plane"

                  position="0.25 0.5 -2" rotation="-90 0 90"
                  radius="0.03"
                  color="blue"
                  material="opacity: 0.5; transparent: true;"
        />
        <a-circle id="jaka-hand1-b"
                  robot-loader="model: jaka_hand_B"
                  /* set-joints-directly-in-degree="60, 30" */
                  attach-to-another="to: jaka-plane"

                  position="0.25 0.5 -2" rotation="-90 0 90"
                  radius="0.03"
                  color="blue"
                  material="opacity: 0.5; transparent: true;"
        />
      </a-plane>
      <a-plane id="nova2-plane"
               position="-1.0 0.0 -1.0" rotation="-90 0 90"
               width="0.02" height="0.02" color="beige"
               material="opacity: 0.15; transparent: true; side: double;"
               robot-loader="model: nova2_robot"
               /* attach-color-recursively="color: azure" */
               change-original-color-recursively="color: azure"
               ik-worker={`${deg90}, ${-deg90}, ${deg90}, 0, ${-deg90}, 0`}
               reflect-worker-joints
               reflect-collision="color: yellow"
               reflect-joint-limits
               joint-desirable={`gain: 2:10; upper: 2:${deg80}; lower: 2:${deg10};`}
               joint-desirable-vlimit="all: 0.5"
               arm-motion-ui
               rapier-rigidbody-attach="rigidBody: nova2SuckerBase; position: 0 0 0.17; quaternion: 0.707107 0 0 0.707107"
               rapier-func-controller
               rapier-fix-by-sucker="hand: nova2Sucker"
               base-mover
               send-base-coord
      />
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
      <a-plane id="k3lit-kinova"
               position="-2.0 0.0 0.0" rotation="-90 0 90"
               width="0.04" height="0.04" color="blue"
               material="opacity: 0.5; transparent: true; side: double;"
               robot-loader="model: kinova-gen3-lite"
               ik-worker={`${0}, ${0}, ${deg90}, ${0}, ${deg90}, 0`}
               reflect-worker-joints
               arm-motion-ui
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
      />
      <a-plane id="ur5e"
               position="-1.0 0.5 -0.0" rotation="-90 0 90"
               width="0.04" height="0.04" color="blue"
               material="opacity: 0.5; transparent: true; side: double;"
               robot-loader="model: ur5e"
               add-frame-to-joints="from: 3; to: 3; length: 0.2"
               ik-worker={`0, ${-deg90}, ${deg90}, 0, ${deg90}, 0`}
               reflect-worker-joints
               reflect-collision="color: orange"
               arm-motion-ui
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
               send-base-coord
      />
    
      <a-plane id="sciurus17"
               position="0.0 -0.2 -0.5" rotation="-90 0 110"
               width="0.4" height="0.4" color="red"
      >
        <a-plane id="sciurus-l-arm"
                 position="0.0 0.0 0.0" rotation="0 0 0"
                 width="0.1" height="0.1" color="tan"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: sciurus17left"
                 ik-worker={
                   toSchema([0, -deg22, deg45, -deg45, -deg90, 0, deg67, 0])}
                 joint-desirable={
                   toSchema({gain: {1:21, 2:21, 6:21},
			     upper: {1:-deg45, 2:deg67, 6:deg67},
			     lower: {1:-deg45, 2:deg67, 6:deg67}})}
                 joint-desirable-vlimit="all: 0.5"
                 joint-weight="override: 0:0.0064"
                 reflect-worker-joints
                 reflect-collision="color: yellow"
                 reflect-joint-limits
                 add-frame-to-joints="from: 0; to: 1"
                 arm-motion-ui
                 base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
                 change-original-color-recursively="color: azure"
        >
          <a-circle id="sciurus-lgripperA"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17lgripperA"
                    attach-to-another="to: sciurus-l-arm;event: a,b,x,y"
                    finger-closer={toSchema({closeMax: 0, openMax: -45,
                                             closeEvent: 'xbuttondown',
                                             closeStopEvent: 'xbuttonup',
                                             openEvent: 'ybuttondown',
                                             openStopEvent: 'ybuttonup'})}
          />
          <a-circle id="sciurus-lgripperB"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17lgripperB"
                    attach-to-another="to: sciurus-l-arm;event: a,b,x,y"
                    finger-closer={toSchema({closeMax: 0, openMax: -45,
                                             closeEvent: 'xbuttondown',
                                             closeStopEvent: 'xbuttonup',
                                             openEvent: 'ybuttondown',
                                             openStopEvent: 'ybuttonup'})}
	  />
        </a-plane>
        <a-plane id="sciurus-r-arm"
                 position="0.0 0.0 0.0" rotation="0 0 0"
                 width="0.1" height="0.1" color="white"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: sciurus17right"
                 attach-to-another="to: sciurus-l-arm; axis: 1"
                 ik-worker={
                   toSchema([deg22, -deg45, deg45, deg90, 0, -deg67, 0])}
                 joint-desirable={
                   toSchema({gain: {0:21, 1:21, 5:21},
                             upper: {0:deg45, 1:-deg67, 5:-deg67},
			     lower: {0:deg45, 1:-deg67, 5:-deg67}})}
                 joint-desirable-vlimit="all: 0.5"
                 reflect-worker-joints
                 reflect-collision="color: yellow"
                 reflect-joint-limits
                 arm-motion-ui
                 change-original-color-recursively="color: azure"
        >
          <a-circle id="sciurus-rgripperA"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17rgripperA"
                    attach-to-another="to: sciurus-r-arm;event: a,b,x,y"
                    finger-closer="closeMax: 0;openMax: 45;debugTick: true"
          />
          <a-circle id="sciurus-rgripperB"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17rgripperB"
                    attach-to-another="to: sciurus-r-arm;event: a,b,x,y"
                    finger-closer="closeMax: 0;openMax: 45;debugTick: true"
          />

        </a-plane>
      </a-plane>


      <a-box id="unitree-g1-torso"
               position="1.0 0.2 -0.5" rotation="-90 0 110"
               base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
               width="0.4" height="0.4" depth="0.1" color="red"
      >
        <a-plane id="g1r-unitree-r-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-right"
                 ik-worker={`${0}, ${-deg22}, ${0}, ${0}, ${0}, 0, 0`}
                 joint-move-to={`${0}, ${deg22}, ${0}, ${0}, ${0}, 0, 0`}
                 exact_solution_slrm="exact: false"
                 joint-desirable="gain: 0:20,1:20,3:40; upper: 0:0.382,1:-0.785,3:1.396; lower: 0:0.382,1:-0.785,3:0.0;"
                 joint-desirable-vlimit="all: 2.0"
                 reflect-collision="color: yellow"
                 reflect-joint-limits
                 arm-motion-ui
                 send-base-coord
        >
          <a-circle id="g1rt-unitree-r-thumb"
                    robot-loader="model: g1-right-thumb"
                    attach-to-another="to: g1r-unitree-r-arm;event: a,b,x,y"
                    ik-worker="0, 0, 0"
                    finger-closer2="stationaryJoints: 0; closeMax: -45"
                    radius="0.003" color="blue"
                    ignore-collision="other:g1r-unitree-r-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
          />
          <a-circle id="g1ri-unitree-r-index"
                    robot-loader="model: g1-right-index"
                    attach-to-another="to: g1r-unitree-r-arm;event: a,b,x,y"
                    ik-worker="0, 0"
                    finger-closer2
                    radius="0.003" color="gray"
                    ignore-collision="other:g1r-unitree-r-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
          />
          <a-circle id="g1rm-unitree-r-middle"
                    robot-loader="model: g1-right-middle"
                    attach-to-another="to: g1r-unitree-r-arm;event: a,b,x,y"
                    ik-worker="0, 0"
                    finger-closer2
                    radius="0.003" color="gray"
                    ignore-collision="other:g1r-unitree-r-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
         />

        <a-plane id="g1l-unitree-l-arm"
                 width="0.1" height="0.1" color="green"
                 material="opacity: 0.5; transparent: true; side: double;"
                 robot-loader="model: g1-left"
                 ik-worker={`${-deg22}, ${deg45}, ${0}, ${0}, ${0}, 0, 0`}
                 joint-move-to={`${0}, ${-deg22}, ${0}, ${0}, ${0}, 0, 0`}
                 exact_solution="exact: false"
                 joint-desirable="gain: 0:20,1:20,3:40; upper: 0:-0.382,1:0.785,3:1.396; lower: 0:-0.382,1:0.785,3:0.0;"
                 joint-desirable-vlimit="all: 2.0"
                 ignore-collision="other:g1r-unitree-r-arm; data: 0/1, 0/0, 1/0"
                 reflect-collision="color: yellow"
                 reflect-joint-limits
                 arm-motion-ui
                 send-base-coord
        >
          <a-circle id="g1lt-unitree-l-thumb"
                    robot-loader="model: g1-left-thumb"
                    attach-to-another="to: g1l-unitree-l-arm;event: a,b,x,y"
                    ik-worker="0, 0, 0"
                    finger-closer2="stationaryJoints: 0; closeMax: 45; closeEvent: xbuttondown; closeStopEvent: xbuttonup; openEvent: ybuttondown; openStopEvent: ybuttonup"
                    radius="0.003" color="gray"
                    ignore-collision="other:g1l-unitree-l-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
          />
          <a-circle id="g1li-unitree-l-index"
                    robot-loader="model: g1-left-index"
                    attach-to-another="to: g1l-unitree-l-arm;event: a,b,x,y"
                    ik-worker="0, 0"
                    finger-closer2="closeMax: -45; closeEvent: xbuttondown; closeStopEvent: xbuttonup; openEvent: ybuttondown; openStopEvent: ybuttonup"
                    radius="0.003" color="gray"
                    ignore-collision="other:g1l-unitree-l-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
          />
          <a-circle id="g1lm-unitree-l-middle"
                    robot-loader="model: g1-left-middle"
                    attach-to-another="to: g1l-unitree-l-arm;event: a,b,x,y"
                    ik-worker="0, 0"
                    finger-closer2="closeMax: -45; closeEvent: xbuttondown; closeStopEvent: xbuttonup; openEvent: ybuttondown; openStopEvent: ybuttonup"
                    radius="0.003" color="gray"
                    ignore-collision="other:g1l-unitree-l-arm; data: 0/7, 0/8, 1/7, 1/8"
                    reflect-collision="color: yellow"
          />
        </a-plane>
        </a-plane>
      </a-box>

      {/* <a-sky color="#ECECEC"></a-sky> */}
    </a-scene>
  );
}
// set-joints-directly={`${deg22}, ${deg30}, ${-deg45}, 0, ${-deg90}, 0`}
// -0.7 0.1 -0.5
export default App
