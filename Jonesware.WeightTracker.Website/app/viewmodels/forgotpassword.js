define(['jquery', 'knockout', 'session', 'plugins/router'], function ($, ko, session, router) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.email = ko.observable().extend({ required: true });

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.email]);

		self.attached = function () {
			submit = $('#Submit');
		};

		self.forgot = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr("disabled", true);

			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/api/accounts/forgotpassword',
				data: {
					Email: self.email(),
					CallbackUrl: '/resetpassword'
				}
			})
			.done(function (data) {
				alert("yay!");
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				self.error(jqXHR.responseJSON.error_description);
			})
			.always(function () {
				submit.attr('disabled', false);
				submit.text('Submit');
			});
		};

		return self;
	}

	return viewModel;
});