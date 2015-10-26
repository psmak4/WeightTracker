define(['jquery', 'knockout', 'session', 'logger'], function ($, ko, session, logger) {
	var viewModel = function () {
		var self = this;

		self.bodyFat = ko.observable();
		self.bmi = ko.observable();
		self.canCalculate = ko.observable();
		self.errors = ko.observableArray([]);

		self.getBodyFat = function () {
			$.ajax({
				method: "GET",
				url: session.baseUrl + '/api/weighins/getbodyfat',
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				self.canCalculate(data.canCalculate);
				if (self.canCalculate()) {
					self.bodyFat(data.bodyFat.value.toFixed(2));
					self.bmi(data.bodyFat.bmi.value.toFixed(2));
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				logger.log({
					message: jqXHR.responseJSON.error_description,
					data: jqXHR.responseJSON.error_description,
					showToast: true,
					type: "error"
				});
			});
		};

		self.activate = function () {
		};

		self.attached = function () {
			self.getBodyFat();
		};
	};

	return new viewModel();
});