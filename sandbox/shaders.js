export const vs1 = `
	varying vec3 v_normal;

	void main(){
		v_normal = normal;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`

export const fs1 = `
	precision mediump float;

	varying vec3 v_normal;
	uniform float t;

	void main(){
		vec3 color = v_normal * (sin(t)/2.0 + 0.5);
		gl_FragColor = vec4(color, 1.0);
	}
`