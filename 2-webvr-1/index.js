// Testing out webvr APIs

require('./index.html');
import './style.css';
import * as THREE from 'three';
import {select} from 'd3';

// This example combines Three.js with the raw WebVR api. 
// Based on the Google Developer article

// Create a basic Three.js scene with a cube
const w = select('#canvas').node().clientWidth;
const h = select('#canvas').node().clientHeight;
const canvas = select('#canvas').append('canvas')
	.attr('width',w)
	.attr('height',h)
	.node();

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(w,h);
renderer.setClearColor(0xeeeeee);

const scene = new THREE.Scene();
const cube = new THREE.Mesh(
		new THREE.CubeGeometry(1,1,1),
		new THREE.MeshNormalMaterial()
	);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(45.0, w/h, 0.1, 500);
camera.position.fromArray([-2,0,0]);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);


// Tradition WebGL rendering
// function animate(){

// 	renderer.render(scene, camera);
// 	requestAnimationFrame(animate);
// }

// animate();

// WebVR portion
getVRDisplay()
	.then(presentToDisplay(canvas))
	.then(display => {
		console.log(display);
		const frameData = new VRFrameData();

		renderVR();

		function renderVR(delta){

			// Update objects in scene
			cube.rotation.y += 0.005;
			cube.rotation.x += 0.005;

			// Get frameData at each refresh
			display.getFrameData(frameData);
			const {leftProjectionMatrix, leftViewMatrix, rightProjectionMatrix, rightViewMatrix} = frameData;

			// In Three.js, do a few things
			// - prevent matrices from updating
			// - prevent renderer autoclear, because we have to render twice, once for each eye
			// - manually clear renderer
			scene.autoUpdate = false;
			renderer.autoClear = false;
			renderer.clear();

			//render left eye
			renderEye(leftViewMatrix, leftProjectionMatrix, {
				x:0, y:0, w:w/2, h:h
			});
			renderer.clearDepth();
			renderEye(rightViewMatrix, rightProjectionMatrix, {
				x:w/2, y:0, w:w/2, h:h
			});

			// Submit the rendered result to device
			display.submitFrame();

			// Update
			display.requestAnimationFrame(renderVR);
		}

		function renderEye(vMatrix, pMatrix, vp){
			renderer.setViewport(vp.x, vp.y, vp.w, vp.h);

			// Update the scene and camera matrices
			camera.projectionMatrix.fromArray(pMatrix);

			// ??
			//camera.matrixWorld.copy(new THREE.Matrix4().getInverse((new THREE.Matrix4()).fromArray(vMatrix)))
			//camera.updateMatrixWorld(true);

			// ??
			cube.matrixWorld.fromArray(vMatrix);
			
			//scene.matrix.fromArray(vMatrix);
			scene.updateMatrixWorld(true);

			renderer.render(scene, camera);
		}
	})
	// // There is a VR display
	// console.log(display);

	// // Create an empty frameData object
	// let frameData = new VRFrameData();

	// // Switcht to VR display
	// // Present various "VR layers" (canvas elements) in VR
	// display.requestPresent([
	// 		{source: canvas}
	// 	])
	// 	.then(_ => {
	// 		console.log(display.getFrameData);
	// 		// Get the latest frameData
	// 		display.getFrameData(frameData);
	// 		const {leftProjectionMatrix, leftViewMatrix, rightProjectionMatrix, rightViewMatrix} = frameData;
	// 		console.log('omg');
	// 		console.log(leftProjectionMatrix);
	// 	})
	// 	.catch(e => {
	// 		console.error(`Unable to init VR ${e}`);
	// 	});



function getVRDisplay(){
	return navigator.getVRDisplays().then(displays => {
		// filter for displays that can present
		const _displays = displays.filter(display => display.capabilities.canPresent);

		if(_displays.length === 0){
			console.log('No VR displays');
			return;
		}

		const vrDisplay = _displays[_displays.length - 1]; //in production, allow users to switch between devices
		// vrDisplay.depthNear = 0.01;
		// vrDisplay.depthFar = 1000;

		return vrDisplay;
	});
}

function presentToDisplay(sourceVRLayer){
	return function(display){
		// display is an instance of VRDisplay
		return display.requestPresent([{source:sourceVRLayer}])
			.then(_ => {
				return display;
			})
			.catch(e => console.error(`Unable to init VR ${e}`));
	}
}



