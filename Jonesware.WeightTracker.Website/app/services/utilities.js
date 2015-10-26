define([], function () {
	var utilities = function () {
		var self = this;

		self.HandleAjaxError = function (jqXHR, errors) {
			errors.removeAll();

			if (jqXHR.responseJSON.error_description)
				errors.push({ 'key': '', 'value': jqXHR.responseJSON.error_description });
			else if (jqXHR.responseJSON.modelState) {
				var modelState = jqXHR.responseJSON.modelState;
				for (var key in modelState) {
					errors.push({ 'key': key, 'value': modelState[key] });
				}
			}
		};

		return self;
	};

	return new utilities;
});