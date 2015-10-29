define(['jquery', 'knockout', 'session', 'logger'], function ($, ko, session, logger) {
	var viewModel = function () {
		var self = this;

		self.bodyFat = ko.observable();
		self.bmi = ko.observable();
		self.weight = ko.observable();
		self.canCalculate = ko.observable();
		self.bodyClass = ko.observable();

		self.errors = ko.observableArray([]);

		self.getStats = function () {
			$.ajax({
				method: "GET",
				url: session.baseUrl + '/api/weighins/getstats',
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				self.canCalculate(data.canCalculate);
				if (self.canCalculate()) {
					self.bodyFat(data.bodyFat.value.toFixed(2));
					self.bmi(data.bodyFat.bmi.value.toFixed(2));
					self.weight(data.weight);
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
			self.getStats();

			self.bodyClass(session.user().gender === 'm' ? 'fa fa-male' : 'fa fa-female');
		};
	};

	return new viewModel();
});