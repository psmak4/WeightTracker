define(['durandal/system', 'toastr'], function (system, toastr) {
	// Internal properties and functions
	var defaults = {
		source: "app",
		title: "",
		message: "no message provided",
		data: "",
		showToast: true,
		type: "info"
	};

	function init() {
		toastr.options.closeButton = true;
		toastr.options.positionClass = 'toast-bottom-right';
		toastr.options.backgroundpositionClass = 'toast-bottom-full-width';
		toastr.options.fadeOut = 1000;
		toastr.options.progressBar = false;
	}

	init();

	var logger = {
		log: log
	};

	return logger;

	function log(options) {
		var opns = $.extend({}, defaults, options);

		system.log(opns.source + ", " + opns.type + ", " + opns.message + ", " + opns.data + " ");

		if (opns.showToast) {
			toastr[opns.type](opns.message, opns.title);
		}
	}
});