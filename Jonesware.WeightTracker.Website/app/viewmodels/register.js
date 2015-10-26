define(['jquery', 'knockout', 'session', 'plugins/router', 'utilities', 'datepicker'], function ($, ko, session, router, utilities) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.email = ko.observable().extend({ required: true, email: true });
		self.username = ko.observable().extend({ required: true });
		self.firstName = ko.observable().extend({ required: true });
		self.lastName = ko.observable().extend({ required: true });
		self.password = ko.observable().extend({ required: true, minLength: 6, maxLength: 100 });
		self.confirmPassword = ko.observable().extend({ required: true, equal: self.password });
		self.dateOfBirth = ko.observable().extend({ required: true, date: true });
		self.height = ko.observable().extend({ required: true, number: true });
		self.gender = ko.observable().extend({ required: true });
		self.genderOptions = [{ value: 'm', text: 'Male' }, { value: 'f', text: 'Female' }];

		self.currentView = ko.observable(1);

		self.errors = ko.observableArray([]);
		self.step1Errors = ko.validation.group([self.username, self.password, self.confirmPassword]);
		self.step2Errors = ko.validation.group([self.email, self.firstName, self.lastName]);
		self.step3Errors = ko.validation.group([self.dateOfBirth, self.height, self.gender]);
		self.validationErrors = ko.validation.group([self.email, self.username, self.firstName, self.lastName, self.password, self.confirmPassword, self.dateOfBirth, self.height, self.gender]);

		self.register = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr('disabled', true);

			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/api/accounts/create',
				data: {
					Email: self.email(),
					UserName: self.username(),
					FirstName: self.firstName(),
					LastName: self.lastName(),
					Password: self.password(),
					ConfirmPassword: self.confirmPassword(),
					DateOfBirth: self.dateOfBirth(),
					Height: self.height(),
					Gender: self.gender().value
				}
			})
			.done(function (data) {
				session.user(data);
			
				self.login();
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
			})
			.always(function () {
				submit.attr('disabled', false);
				submit.text('Submit');
			});
		};

		self.login = function () {
			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/oauth/token',
				data: {
					username: self.username(),
					password: self.password(),
					grant_type: 'password'
				}
			})
			.done(function (data) {
				session.accessToken(data.access_token);
				localStorage.setItem('accessToken', data.access_token);
				session.isLoggedIn(true);

				router.navigate('/');
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
			});
		};

		self.displayStep1 = function () {
			self.currentView(1);
		}

		self.displayStep2 = function () {
			if (self.currentView() === 1) {
				if (self.step1Errors().length > 0) {
					self.step1Errors.showAllMessages();
					return;
				}
			}
			self.currentView(2);
		}

		self.displayStep3 = function () {
			if (self.step2Errors().length > 0) {
				self.step2Errors.showAllMessages();
				return;
			}
			self.currentView(3);
		}

		self.attached = function (view) {
			$('#DateOfBirth').datepicker({
				autoclose: true,
				format: 'm/d/yyyy',
				orientation: 'top left'
			});

			submit = $('#Submit');
		};
	}

	return new viewModel();
});