define(['jquery', 'knockout', 'session', 'plugins/router', 'utilities', 'datepicker'], function ($, ko, session, router, utilities) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.email = ko.observable().extend({ required: true });
		self.username = ko.observable().extend({ required: true });
		self.firstName = ko.observable().extend({ required: true });
		self.lastName = ko.observable().extend({ required: true });
		self.password = ko.observable().extend({ required: true });
		self.confirmPassword = ko.observable().extend({ required: true, equal: self.password });
		self.dateOfBirth = ko.observable().extend({ required: true });
		self.feet = ko.observable().extend({ required: true });
		self.inches = ko.observable().extend({ required: true });
		self.gender = ko.observable().extend({ required: true });
		self.genderOptions = [{ value: 'm', text: 'Male' }, { value: 'f', text: 'Female' }];

		self.currentView = ko.observable(1);

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.email, self.username, self.firstName, self.lastName, self.password, self.confirmPassword, self.dateOfBirth, self.feet, self.inches, self.gender]);

		self.register = function () {
			if (self.dateOfBirth() === '')
				self.dateOfBirth.setError('This field is required.');

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
					Height: CalculateHeight(self.feet(), self.inches()),
					Gender: self.gender().value,
					Theme: 'blue'
				}
			})
			.done(function (data) {
				session.user(data);
			
				self.login();
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
				ProcessErrors();
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

		self.attached = function (view) {
			$('#DateOfBirth').datepicker({
				autoclose: true,
				format: 'm/d/yyyy',
				orientation: 'bottom left'
			});
			self.dateOfBirth.clearError();

			submit = $('#Submit');
		};

		function CalculateHeight(feet, inches) {
			var height = (+feet * 12) + +inches;
			if (isNaN(height))
				height = '';
			if (height === 0)
				height = '';

			return height;
		}

		function ProcessErrors() {
			var observable;
			var errorMessage;
			$.each(self.errors(), function (key, value) {
				observable = value.key.split('.')[1];
				errorMessage = String(value.value);
				switch (observable) {
					case 'Email':
						self.email.setError(errorMessage);
						break;
					case 'Username':
						self.username.setError(errorMessage);
						break;
					case 'Password':
						self.password.setError(errorMessage);
						break;
					case 'ConfirmPassword':
						self.confirmPassword.setError(errorMessage);
						break;
					case 'FirstName':
						self.firstName.setError(errorMessage);
						break;
					case 'LastName':
						self.lastName.setError(errorMessage);
						break;
					case 'DateOfBirth':
						self.dateOfBirth.setError(errorMessage);
						break;
					case 'Height':
						self.feet.setError(errorMessage);
						break;
					case 'Gender':
						self.gender.setError(errorMessage);
						break;
				}
			});
			self.validationErrors.showAllMessages();
		}

		return self;
	}

	return new viewModel();
});