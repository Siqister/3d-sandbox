//https://github.com/mrdoob/three.js/blob/master/examples/webvr_cubes.html
console.log('Threejs + WebVR + cube');
require('./index.html');
import './style.css';

import * as THREE from 'three';
import {WEBVR} from 'three/examples/jsm/vr/WebVR.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js'

// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70.0, window.innerWidth/window.innerHeight, 0.1, 500);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x303030);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.vr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild(WEBVR.createButton(renderer));

renderer.setAnimationLoop(render);


// STATIC OBJECTS

// Room
const room = new THREE.LineSegments(
	new BoxLineGeometry(6,6,6,10,10,10),
	new THREE.LineBasicMaterial({color:0x808080})
);
room.geometry.translate(0,3,0);
scene.add(room);

// Light;
const light = new THREE.PointLight({color:0xffffff});
light.position.y = 3;
scene.add(light);

// Cube meshes
const NUM_OF_CUBES = 200;
const SIZE = .08;
for(let i = 0; i < NUM_OF_CUBES; i++){
	const cube = new THREE.Mesh(
		new THREE.BoxGeometry(SIZE, SIZE, SIZE),
		new THREE.MeshLambertMaterial({color:Math.random()*0xffffff})
	);

	// cube.position.x = Math.random()*4-2;
	// cube.position.y = Math.random()*4-2;
	// cube.position.z = Math.random()*4-2;
	cube.position.x = 0;
	cube.position.y = 0;
	cube.position.z = 0;


	Object.assign(cube.userData, {
		vx: Math.random()*.1-.05,
		vy: Math.random()*.1-.05,
		vz: Math.random()*.1-.05,

		rx: Math.random()*.1-.05,
		ry: Math.random()*.1-.05,
		rz: Math.random()*.1-.05
	});

	room.add(cube);
}

console.log(room.children)

// Render loop
function render(){
	renderer.render(scene, camera);

	// Animate each cube
	updateCubes();
}

function updateCubes(){
	room.children.forEach(cube => {
		const {vx, vy, vz, rx, ry, rz} = cube.userData;

		cube.rotation.x += rx;
		cube.rotation.y += ry;
		cube.rotation.z += rz;

		// cube.position.x += vx;
		// cube.position.y += vy;
		// cube.position.z += vz;
	});
}

