console.log('threejs webvr 1');

require('./index.html');
import './style.css';

//Libraries
import * as THREE from 'three';
import {WEBVR} from 'three/examples/jsm/vr/WebVR.js';

//Render a simple cube
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45.0, w/h, 0.1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.setClearColor(0x333333);

document.body.appendChild(renderer.domElement);

//Geometry
const box = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshNormalMaterial()
	);
scene.add(box);
box.position.fromArray([0,.5,-5]);

//Move camera
camera.position.fromArray([5,5,5]);
camera.lookAt(new THREE.Vector3(0,0,0));

//WebVR stuff
document.body.appendChild(WEBVR.createButton(renderer));
renderer.vr.enabled = true;

renderer.setAnimationLoop(function(){
	renderer.render(scene, camera);
});

console.log(renderer.vr);

// render();

// function render(){
// 	renderer.render(scene, camera);
// 	requestAnimationFrame(render);
// }