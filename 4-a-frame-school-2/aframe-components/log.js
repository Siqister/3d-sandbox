require('aframe');

AFRAME.registerComponent('log', {
	schema: {
		//define properties, type, and default value
		event: {type:'string', default:''}, //for attaching custom events
		message: {type:'string', default:'log'}
	},
	init: function(){

	},
	update: function(prevData){
		//update method is called after component mount

		const data = this.data;
		const el = this.el; // reference to the parent entity

		console.log(data.message);
	},
	remove: function(){

	}
});