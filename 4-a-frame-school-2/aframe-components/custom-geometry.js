require('aframe');
import * as THREE from 'three';

AFRAME.registerGeometry('custom', {
	schema:{
		vertices:{
			default:['-10 10 0', '-10 -10 0', '10 -10 0']
		}
	}, 

	init: function(data){
		//construct this.geometry from data.vertices
		const vertices = new Float32Array(data.vertices.reduce((acc,val) => acc + ' ' + val, '').split(' ').map(d => parseInt(d)).slice(1));
		const geometry = new THREE.BufferGeometry();
		geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
	    geometry.computeFaceNormals();
	    geometry.computeVertexNormals();
		this.geometry = geometry;
	}
})