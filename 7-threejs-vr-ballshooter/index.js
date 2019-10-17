//https://github.com/mrdoob/three.js/blob/master/examples/webvr_ballshooter.html
console.log('Ballshooter');
require('./index.html');
import './style.css';

import * as THREE from 'three';
import {WEBVR} from 'three/examples/jsm/vr/WebVR.js';
import {BoxLineGeometry} from 'three/examples/jsm/geometries/BoxLineGeometry.js'

//Init scene, camera, renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70.0, window.innerWidth/window.innerHeight, 0.1, 500);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x505050);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.vr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild(WEBVR.createButton(renderer));

//Create static objects
//Room
const room = new THREE.LineSegments(
	new BoxLineGeometry(6,6,6,10,10,10),
	new THREE.LineBasicMaterial({color:0x808080})
);
room.geometry.translate(0,3,0);
scene.add(room);

//Balls
const balls = new THREE.Object3D();
const geometry = new THREE.IcosahedronBufferGeometry( 0.03, 2 );
for(let i = 0; i < 200; i++){
	const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ color: Math.random() * 0xffffff }));

	mesh.position.x = Math.random()*4-2;
	mesh.position.y = Math.random()*4;
	mesh.position.z = Math.random()*4-2;

	balls.add(mesh);
}
scene.add(balls);

//Render
renderer.setAnimationLoop(render);

function render(){
	renderer.render(scene, camera);
}