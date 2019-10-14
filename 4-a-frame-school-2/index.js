console.log('A Frame school 2');

require('./index.html');
require('aframe');

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
	.data(new Array(500).map(d => Math.floor(256*Math.random())));

const boxesEnter = boxes.enter()
	.append('a-box')
	.attr('position', d => `${Math.random()*100-50}, ${Math.random()*100-50}, ${Math.random()*100-50}`)
	.attr('rotation', d => `${Math.random()*360} ${Math.random()*360} ${Math.random()*360}`)
	.attr('color', d => d.toString(16));