console.log('A Frame school 3');

require('./index.html');
require('aframe');
import {select} from 'd3';

//OBJ models
import obj from './test-1-nurbs.obj';
import mtl from './test-1-nurbs.mtl';

console.log(obj);
console.log(mtl);

const scene = select('body').append('a-scene');
scene.append('a-box')
	.attr('position', '0 0 -5')
	.attr('color', 'red');

//Loading OBJ models
const assets = scene.append('a-assets');
assets.append('a-asset-item')
	.attr('id','model-obj')
	.attr('src', obj);
assets.append('a-asset-item')
	.attr('id','model-mtl')
	.attr('src', mtl);

const model = scene.append('a-entity')
	.attr('obj-model', 'obj:#model-obj; mtl:#model-mtl')
	.attr('position','0 0 -100');