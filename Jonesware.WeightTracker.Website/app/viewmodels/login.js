define(['jquery', 'knockout', 'plugins/router', 'session', 'utilities'], function ($, ko, router, session, utilities) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.username = ko.observable().extend({ required: true });
		self.password = ko.observable().extend({ required: true });

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.username, self.password]);

		self.attached = function () {
			submit = $('#Submit');
		};

		self.login = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr('disabled', true);

			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/oauth/token',
				data: {
					username: self.username(),
					password: self.password(),
					grant_type: 'password'
				},
				statusCode: {
				    401: function () {
				        session.clear();
				        console.log("Unauthorized error received");
				    }
				}
			})
			.done(function (data) {
				session.accessToken(data.access_token);
				localStorage.setItem('accessToken', data.access_token);

				self.getUser(data.access_token);
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
			})
			.always(function () {
				submit.attr('disabled', false);
				submit.text('Submit');
			});
		};

		self.getUser = function (token) {
			$.ajax({
				method: 'GET',
				url: session.baseUrl + '/api/accounts/user/me',
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
			.done(function (data) {
				session.user(data);
				session.isLoggedIn(true);

				router.navigate('/dashboard');
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
			});
		};

		return self;
	}

	return new viewModel();
});