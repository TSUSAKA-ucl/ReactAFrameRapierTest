import {getRigidBody, getJoint,
	FunctionState, getStepTime} from './rapierObjectUtils.js'

// ****************
// Create a dynamic rigid-body.
const hand23props = {
  // density: 0.000000000002, // or mass or massProperties
  friction: 3.9,
  frictionCombineRule: 'Max',
  restitution: 0.9,
  restitutionCombineRule: 'Min',
};
const end1props = {
  friction: 3.9,
  frictionCombineRule: 'Max',
};
const fingerProps = {
  density: 3.0,
  friction: 9.9,
  frictionCombineRule: 'Max',
};
//
const mag=0.25;
// const sq=0.707107;
const redWidth = 0.6*mag;
const redThickness = 0.2*mag;
const redFingerLength = 0.6*mag;
const redFingerWidth = 0.25*mag;
const redFingerThickness = 0.05*mag;
//
const jakaPalmThickness=0.160/2;
const jakaFingerLength=0.112/2;

const rigidBodyArray = [
  { name: 'floor',
    type: 'kinematicPosition',
    position: {x: 0, y: -1, z: 0},
    collider: [ { shape: 'box',
		size: {x: 10.5, y:1, z:10.5},
		color: '#7BC8A4',
		// opacity: 0.5,
		},
		{ shape: 'box',
		  size: {x: 10.5, y:0.2, z:0.2},
		  translation: [0, 1.2, 10.5],
		  color: 'SlateGray',
		  // opacity: 0.5,
		},
		{ shape: 'box',
		  size: {x: 10.5, y:0.2, z:0.2},
		  translation: [0, 1.2, -10.5],
		  color: 'SlateGray',
		  // opacity: 0.5,
		},
		{ shape: 'box',
		  size: {x: 0.2, y:0.2, z:10.5},
		  translation: [10.5, 1.2, 0],
		  color: 'SlateGray',
		  // opacity: 0.5,
		},
		{ shape: 'box',
		  size: {x: 0.2, y:0.2, z:10.5},
		  translation: [-10.5, 1.2, 0],
		  color: 'SlateGray',
		  // opacity: 0.5,
		},
	      ],
  },
  { name: 'nova2SuckerBase',
    type: 'kinematicPosition',
    position: {x: -2.5, y: 0.4, z: -0.2},
    orientation: {w:1, x:0, y:0.0, z:0.0},
    collider: { shape: 'cylinder',
		size: {radius: 0.01, halfHeight: 0.01},
		color: 'SlateGray',
	      },
  },
  { name: 'nova2Sucker',
    position: {x: -2.5, y: 0.3, z: -0.2},
    orientation: {w:1, x:0, y:0.0, z:0.0},
    collider: { shape: 'cylinder',
		size: {radius: 0.01, halfHeight: 0.01},
		color: 'Red',
	      },
  },
  { name: 'jakaHand',
    type: 'kinematicPosition',
    position: {x: (0.0)*mag, y: (2.5)*mag, z: (-1.0)*mag},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.02), y: (0.04), z: (jakaPalmThickness-0.01)},
		color: 'SlateGray',
		opacity: 0.2,
	      },
  },
  { name: 'jakaHandL',
    position: {x: (0.0)*mag, y: (2.5)*mag+0.02, z: (-1.0)*mag+0.04},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.015), y: (0.005), z: (jakaFingerLength)},
		props: fingerProps,
		color: 'ForestGreen',
		opacity: 0.2,
	      },
  },
  { name: 'jakaHandR',
    position: {x: (0.0)*mag, y: (2.5)*mag-0.02, z: (-1.0)*mag+0.04},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.015), y: (0.005), z: (jakaFingerLength)},
		props: fingerProps,
		color: 'DarkBlue',
		opacity: 0.2,
	      },
  },
  { name: 'box1',
    type: 'kinematicPosition',
    position: {x: (2.0)*mag, y: (2.5)*mag, z: (-3.0)*mag},
    orientation: {w: 0.991445, x:0.0, y:0.0, z:0.130526},
    collider: { shape: 'box',
		size: {x: (0.4)*mag, y: (0.6)*mag, z: (0.2)*mag},
		color: '#4CC3D9', // light blue color
	      },
  },
  { name: 'box2',
    position: {x: (2.0)*mag, y: (4.0)*mag, z: (-3.0)*mag},
    orientation: {w: 0.991445, x:0.0, y:0.0, z:-0.130526},
    collider: { shape: 'box',
		size: {x: (0.25)*mag, y: (0.05)*mag, z: (0.6)*mag},
		color: 'PowderBlue',
	      },
  },
  { name: 'box3',
    position: {x: (2.0)*mag, y: (3.5)*mag, z: (-3.0)*mag},
    orientation: {w: 0.991445, x:0.0, y:0.0, z:-0.130526},
    collider: { shape: 'box',
		size: {x: (0.25)*mag, y: (0.05)*mag, z: (0.6)*mag},
		color: 'SteelBlue'
	      },
  },
  //
  { name: 'hand1',
    type: 'kinematicPosition',
    position: {x: (6.0)*mag, y: (2.0)*mag, z: (-3.0)*mag},	
    orientation: {w: 0.991445, x:0.0, y:0.0, z:0.130526},
    collider: [
      { shape: 'box',
	size: {x: redThickness*2,
	       y: redWidth,
	       z: redThickness},
	color: 'Crimson', // dark red color
      },
      { shape: 'box',
	translation: [0,
		      redWidth+redFingerThickness,
		      redThickness+redFingerLength+0.1],
	size: {x: redFingerWidth,
	       y: redFingerThickness,
	       z: redFingerLength},
	props: hand23props,
	color: '#FF6347',	// tomato color
      },
      
      { shape: 'box',
	translation: [0,
		      -(redWidth+redFingerThickness),
		      redThickness+redFingerLength+0.1],
	size: {x: redFingerWidth,
	       y: redFingerThickness,
	       z: redFingerLength},
	props: hand23props,
	density: 0.02,
	color: 'LightCoral',
      },
    ]
  },
  { name: 'hand2',
    position: {x: (6.0)*mag, y: (4.0)*mag, z: (-3.0)*mag},
    orientation: {w: 0.991445, x:0.0, y:0.0, z:-0.130526},
    collider: { shape: 'box',
		size: {x: redFingerWidth,
		       y: redFingerThickness,
		       z: redFingerLength},
		props: hand23props,
		color: '#FF6347',	// tomato color
	      },
  },
  { name: 'hand3',
    position: {x: (6.0)*mag, y: (3.5)*mag, z: (-3.0)*mag},
    orientation: {w: 0.991445, x:0.0, y:0.0, z:-0.130526},
    collider: { shape: 'box',
		size: {x: redFingerWidth,
		       y: redFingerThickness,
		       z: redFingerLength},
		props: hand23props,
		density: 0.02,
		color: 'LightCoral',
	      },
  },
  //
  { name: 'end1',
    position: {x: (2.0)*mag, y: (3.5)*mag, z: (-3.0-4)*mag},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.4)*mag, y: (0.6)*mag, z: (0.2)*mag},
		props: end1props,
		color: 'Moccasin' // light orange color
	      },
  },
  { name: 'end2',
    position: {x: (2.0)*mag, y: (3.5-0.6)*mag, z: (-3.0+0.6+0.2-4)*mag},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.25)*mag, y: (0.05)*mag, z: (0.6)*mag},
		color: 'LemonChiffon'	// light yellow color
	      },
  },
  { name: 'end3',
    position: {x: (2.0)*mag, y: (3.5+0.6)*mag, z: (-3.0+0.6+0.2-4)*mag},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.25)*mag, y: (0.05)*mag, z: (0.6)*mag},
		color: 'Khaki' // light yellow color
	      },
  },
  { name: 'ball1',
    position: {x: (-0.7)*mag, y: (3.5+0.6)*mag, z: (-3.0+0.6+0.2)*mag},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'sphere',
		size: {radius: (0.13)*mag},
		color: 'Gold',
	      },
  },
  { name: 'cylinder1',
    position: {x: -0.8, y: 0.06, z: -1.0},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'cylinder',
		size: {radius: (0.02), halfHeight: (0.05)},
		color: 'Orange',
	      },
  },
  { name: 'obstacle1',
    position: {x: -0.8, y: 0.06, z: -1.1},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.02), y: 0.01, z: (0.05)},
		color: 'Blue',
	      },
  },
  { name: 'obstacle2',
    position: {x: -0.8, y: 0.06, z: -0.9},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: { shape: 'box',
		size: {x: (0.02), y: 0.02, z: (0.03)},
		color: 'Blue',
	      },
  },
  { name: 'obstacle3',
    position: {x: -0.35, y: 0.06, z: -1.3},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: [ { shape: 'cylinder',
		  size: {radius: (0.02), halfHeight: (0.05)},
		  color: 'Blue',
		},
	      ],
  },
  { name: 'obstacle4',
    position: {x: -0.38, y: 0.06, z: -1.2},
    orientation: {w: 1.0, x:0.0, y:0.0, z:0.0},
    collider: [ { shape: 'box',
		  size: {x: (0.02), y: 0.02, z: (0.07)},
		  opacity: 0.5,
		  color: 'Blue',
		},
		{ shape: 'cylinder',
		  translation: [0, 0.02+0.01, 0],
		  size: {radius: (0.02), halfHeight: (0.01)},
		  color: 'Red',
		},
	      ],
  },
];

// ****************
// definition of joints
const x = { x: 1.0, y: 0.0, z: 0.0 };
const y = { x: 0.0, y: 1.0, z: 0.0 };
const yInv = { x: 0.0, y: -1.0, z: 0.0 };
// const z = { x: 0.0, y: 0.0, z: 1.0 };
const o = { x: 0.0, y: 0.0, z: 0.0 };
//
// anchor points on objects
const apBoxBJnt1A = {x: (0.0)*mag, y: (-0.6)*mag, z: (0.2)*mag};
const apBoxBJnt1B = {x: (0.0)*mag, y: (0.05)*mag, z: (-0.6)*mag};
const apBoxBJnt2A = {...apBoxBJnt1A}; apBoxBJnt2A.y = -apBoxBJnt2A.y;
const apBoxBJnt2B = {...apBoxBJnt1B}; apBoxBJnt2B.y = -apBoxBJnt2B.y;
//
const apHandJnt1A = {x: 0, y: -redWidth,
		     z: redFingerLength + redThickness + 0.05*mag};
const apHandJnt2A = {...apHandJnt1A}; apHandJnt2A.y = -apHandJnt1A.y;
//
const apEndJnt1A = {x: (0.0)*mag, y: (-0.6+0.28)*mag, z: (0.2)*mag};
const apEndJnt2A = {...apEndJnt1A}; apEndJnt2A.y = -apEndJnt1A.y;
const apEndJnt1B = {x: (0.0)*mag, y: (0.0)*mag, z: (-0.6)*mag};
const apEndJnt2B = {...apEndJnt1B}; apEndJnt2B.y = -apEndJnt1B.y;
//
const jakaHandJntL = {x: (0.0), y: (0.005), z: (jakaPalmThickness+jakaFingerLength)};
const jakaHandJntR = {...jakaHandJntL}; jakaHandJntR.y = -jakaHandJntL.y;
//
const endJStiffness = 2.0*800.0;
const endJDamping = 1000.0;
const handJDamping = 300.0;
const velocMotor0 = (damping) => {
  return { type: 'velocity', targetVel: 0, damping: damping };
};
const positionMotor0 = (stiffness, damping) => {
  return { type: 'position', targetPos: 0,
	   stiffness: stiffness, damping: damping};
};

//
const jointArray = [
  { name: 'nova2Hand',
    type: 'prismatic',
    axis: y,
    bodyA: 'nova2SuckerBase', anchorA: {x:0, y:0.04, z:0},
    bodyB: 'nova2Sucker', anchorB: o,
    limits: [-0.02, 0.02],
    motor: { type: 'position',
	     targetPos: 0,
	     stiffness: 1000,
	     damping: 63.25,
	   },
    // type: 'fixed',
    // bodyA: 'nova2SuckerBase',
    // bodyB: 'nova2Sucker',
    // positionA: {x:0, y:0.04, z:0},
    // positionB: {x:0, y:0, z:0},
    // orientationA: {w:1, x:0, y:0, z:0},
    // orientationB: {w:1, x:0, y:0, z:0},
  },
  {
    name: 'jakaHandJL',  type: 'prismatic',
    // modeling: 'reduction',
    bodyA: 'jakaHand',  anchorA: jakaHandJntL,
    bodyB: 'jakaHandL',  anchorB: o,
    axis: y,
    limits: [-0.00, 0.04],
    motor: velocMotor0(handJDamping),
  },
  {
    name: 'jakaHandJR',  type: 'prismatic',
    bodyA: 'jakaHand',  anchorA: jakaHandJntR,
    bodyB: 'jakaHandR',  anchorB: o,
    axis: yInv,
    limits: [-0.00, 0.04],
    motor: velocMotor0(handJDamping),
  },

  {
    name: 'boxJoint1',  type: 'revolute',
    bodyA: 'box1',  anchorA: apBoxBJnt1A,
    bodyB: 'box2',  anchorB: apBoxBJnt1B,
    axis: x,
  },
  {
    name: 'boxJoint2',  type: 'revolute',
    bodyA: 'box1',  anchorA: apBoxBJnt2A,
    bodyB: 'box3',  anchorB: apBoxBJnt2B,
    axis: x,
  },
  //
  {
    name: 'handJoint1',  type: 'prismatic',
    bodyA: 'hand1',  anchorA: apHandJnt1A,
    bodyB: 'hand2',  anchorB: o,
    axis: yInv,
    limits: [-(redWidth-redFingerThickness), 0],
    motor: velocMotor0(handJDamping),
  },
  {
    name: 'handJoint2',  type: 'prismatic',
    bodyA: 'hand1',  anchorA: apHandJnt2A,
    bodyB: 'hand3',  anchorB: o,
    axis: y,
    limits: [-(redWidth-redFingerThickness), 0],
    motor: velocMotor0(handJDamping),
  },
  {
    name: 'endJoint1',  type: 'prismatic',
    bodyA: 'end1',  anchorA: apEndJnt1A,
    bodyB: 'end2',  anchorB: apEndJnt1B,
    axis: yInv,
    limits: [-0.5, 0.5],
    motor: positionMotor0(endJStiffness, endJDamping),
  },
  {
    name: 'endJoint2',  type: 'prismatic',
    bodyA: 'end1',  anchorA: apEndJnt2A,
    bodyB: 'end3',  anchorB: apEndJnt2B,
    axis: y,
    limits: [-0.5, 0.5],
    motor: positionMotor0(endJStiffness, endJDamping),
  },
];

// ****************
const functionArray = [
  { name: 'box1Translation',
    initialState: FunctionState.ACTIVE,
    method: function (t) {
      const object = this;
      if (!object.time) object.time = t;
      const ot = object.time;
      const rigidbody = getRigidBody('box1');
      rigidbody
        .setNextKinematicTranslation({x: 8.0*mag, y: 2.5*mag,
				      z: (-3.0+0.5*Math.sin(2.0*Math.PI*ot))*mag
                                     });
      object.time += getStepTime();
    },
  },
  { name: 'endJointClose',
    method: () => {
      getJoint('endJoint1')
        .configureMotorPosition(-0.1, endJStiffness, endJDamping);
      getJoint('endJoint2')
        .configureMotorPosition(-0.1, endJStiffness, endJDamping);
    },
  },
  { name: 'endJointOpen',
    method: () => {
      getJoint('endJoint1')
        .configureMotorPosition(0.1, endJStiffness, endJDamping);
      getJoint('endJoint2')
        .configureMotorPosition(0.1, endJStiffness, endJDamping);
    },
  },
  { name: 'handJointClose',
    method: () => {
      getJoint('jakaHandJL')
        .configureMotorVelocity(-0.06, handJDamping);
      getJoint('jakaHandJR')
        .configureMotorVelocity(-0.06, handJDamping);
    },
  },
  { name: 'handJointOpen',
    method: () => {
      getJoint('jakaHandJL')
        .configureMotorVelocity(0.02, handJDamping);
      getJoint('jakaHandJR')
        .configureMotorVelocity(0.02, handJDamping);
    },
  },
  { name: 'mapVeloc',
    method: (time,arg) => {
      Object.entries(arg).forEach(([key, value]) => {
	console.log('WORKER:: joint:', key, 'velocity:', value);
	getJoint(key).configureMotorVelocity(value, handJDamping);
      });
    },
  },
  { name: 'contactGraph',
    method: (time,arg) => {
      console.log('name:', arg.name);
      const rigidBody = getRigidBody(arg.name);
      console.log('rigidBody:', rigidBody);
      const collider = rigidBody.collider(0);
      self.world.contactPairsWith(collider, (otherCollider) => {
	console.log("NEAR COLLIDER:", otherCollider);
      });
    },
  },
  { name: 'rayCastFix',
    method: (time,arg) => {
      console.log('name:', arg.name);
      const rigidBody = getRigidBody(arg.name);
      const collider = rigidBody.collider(0);
      // console.log('collider rot:', collider.rotation());
      // console.log('collider origin:', collider.translation());
      // console.log('collider halfHeight:', collider.halfHeight());
      const start = collider.translation();
      const rot = collider.rotation();
      const hh = collider.halfHeight();
      const localDirection = {x:0, y: 1, z: 0};
      const direction = rotateVecByQuat(localDirection, rot);
      if (rigidBody && collider && start && rot && hh) {
	const ray = new self.RAPIER.Ray(start, direction);
	// console.log('ray origin:', ray.origin, ' dir:', ray.dir);
	const maxToi = 0.5 + hh;
	const filterFlags = self.RAPIER.QueryFilterFlags.EXCLUDE_FIXED
	      || self.RAPIER.QueryFilterFlags.EXCLUDE_SENSORS
	      || self.RAPIER.QueryFilterFlags.EXCLUDE_KINEMATICS;
	const filterGroup = 0x000b0001;
	const excludeCollider = collider;
	const hit = self.world.castRayAndGetNormal(ray, maxToi, false,
						   filterFlags, filterGroup,
						   excludeCollider);
	if (hit) {
	  const fixName = 'rayCastFixJoint';
	  console.log('HIT collider:', hit.collider);
	  console.log('HIT rigidBody:', hit.collider?.parent());
	  console.log('HIT featureType:', hit.featureType);
	  console.log('HIT toi:', hit.timeOfImpact);
	  const distance = hit.timeOfImpact * 1.0 - hh;
	  console.log('distance:', distance);
	  console.log('HIT normal:', hit.normal);
	  if (-0.01 < distance && distance < 0.01) {
	    self.fixRigidBodies(fixName, rigidBody, hit.collider.parent());
	  } else {
	    console.warn('OUT OF RANGE. distance:', distance);
	  }
	} else {
	  console.warn('NO HIT');
	}
      }
    },
  },
  { name: 'clearFixedRB',
    method: (time, arg) => {
      const fixName = 'rayCastFixJoint';
      self.clearFixedRigidBodies(fixName);
    },
  },
];

// function vector3add(v1,v2) {
//   return {
//     x: v1.x + v2.x,
//     y: v1.y + v2.y,
//     z: v1.z + v2.z,
//   };
// }
// quaternion と vector の積（回転）を計算するヘルパー
function rotateVecByQuat(v, q) {
  // q = (x, y, z, w)
  const x = q.x, y = q.y, z = q.z, w = q.w;

  // q のベクトル部分
  // const qv = { x, y, z };

  // t = 2 * cross(q.xyz, v)
  const t = {
    x: 2 * (y * v.z - z * v.y),
    y: 2 * (z * v.x - x * v.z),
    z: 2 * (x * v.y - y * v.x)
  };

  // v' = v + w*t + cross(q.xyz, t)
  return {
    x: v.x + w * t.x + (y * t.z - z * t.y),
    y: v.y + w * t.y + (z * t.x - x * t.z),
    z: v.z + w * t.z + (x * t.y - y * t.x),
  };
}



// ****************
// exports
export default {
  rigidBodies: rigidBodyArray,
  joints: jointArray,
  functions: functionArray,
}
