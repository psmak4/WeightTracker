define(['durandal/system', './transitionHelper'], function (system, helper) {
	var settings = {
		inAnimation: 'zoomIn',
		outAnimation: 'zoomOut'
	},
		  fadeIn = function (context) {
		  	system.extend(context, settings);
		  	return helper.create(context);
		  };

	return fadeIn;
});