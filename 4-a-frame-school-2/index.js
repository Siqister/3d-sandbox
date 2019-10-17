console.log('A Frame school 2');

require('./index.html');
require('aframe');

// A-Frame components
import './aframe-components/log.js';
import './aframe-components/custom-geometry.js';

import {select} from 'd3';

// PART I: ENTITIES
// Working with entities
// Because entities are mapped to DOM, DOM manipulation (via d3) should produce a A-Frame/ThreeJS scenegraph
const scene = select('body')
	.append('a-scene');

scene.append('a-box')
	.attr('position', '0 0 -5')
	.attr('color', '#03afeb');

// Programmatically generate a bunch of boxes
const boxes = scene.selectAll('a-box')
	.data(Array.from({length:500}).map(d => Math.floor(256*Math.random())));

const boxesEnter = boxes.enter()
	.append('a-box')
	.attr('position', d => `${Math.random()*100-50}, ${Math.random()*100-50}, ${Math.random()*100-50}`)
	.attr('rotation', d => `${Math.random()*360} ${Math.random()*360} ${Math.random()*360}`)
	.attr('color', d => '#ccc')
	.attr('log', d => `message: ${d}`); //a custom log component with a "message" property

// Programmatically update the "log" component and its "message" property for all the "box" entities
console.log('UPDATE BOXES');
delay(2000).then(res => {
	scene.selectAll('a-box')
		.filter(d => d < 128)
		.each(function(d){
			const el = this; //Entity
			el.setAttribute('log', 'message', `Box with data ${d} is updated`); // update "log" component, calls its "update" life cycle components
			el.setAttribute('position', d => `${Math.random()*100-50}, ${Math.random()*100-50}, ${Math.random()*100-50}`);
		});

	console.log('UPDATE BOXES:COMPLETE');
});

function delay(sec){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, sec);
	});
}

// PART II: ENTITIES WITH CUSTOM GEOMETRY AND SHADER MATERIAL
const triangles = scene.selectAll('.triangle')
	.data(Array.from({length:500}).map(d => Math.floor(256*Math.random())));
const trianglesEnter = triangles.enter()
	.append('a-entity')
	.attr('class','triangle')
	.attr('geometry', 'primitive:custom; vertices:-1 1 0, -1 -1 0, 0 0 0')
	.attr('position', d => `${Math.random()*100-50}, ${Math.random()*100-50}, ${Math.random()*100-50}`)
	.attr('rotation', d => `${Math.random()*360} ${Math.random()*360} ${Math.random()*360}`)
	.attr('color', d => 'red')



