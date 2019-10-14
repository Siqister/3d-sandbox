// This is a test sandbox for me to recover from my 3D amnesia!

require('./index.html');
import './style.css';

import * as THREE from 'three';
import {select} from 'd3';
import {vs1, fs1} from './shaders.js';


// RENDERER
// Set up render canvas
const w = select('#canvas').node().clientWidth;
const h = select('#canvas').style('height','100%').node().clientHeight;
const canvas = select('#canvas').append('canvas')
	.attr('width',w)
	.attr('height',h)
	.node();
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias:true,
});
renderer.setSize(w,h);
renderer.setClearColor(0x333333);

// SCENE, CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 500);
camera.position.fromArray([-5,-5,5]);
camera.lookAt(new THREE.Vector3(0,0,0));

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// MESHES
// Instance 1: 
const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshNormalMaterial()
);
cube1.position.fromArray([0,0,0]);
scene.add(cube1);

// Instance 2: cube, with buffer geometry and shaders
const cube2 = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1,1,1),
	new THREE.ShaderMaterial({
		uniforms:{
			t: {
				value:Date.now()/1000
			}
		},
		vertexShader:vs1,
		fragmentShader:fs1
	})
);
cube2.position.fromArray([3,0,0]);
scene.add(cube2);

// RENDER LOOP
function animate(){
	renderer.render(scene, camera);
	requestAnimationFrame(animate);

	//Animate cube2
	cube2.material.uniforms.t.value = Date.now()%1000/1000;
	cube2.rotation.z += 0.01;

}

animate();


