define(['knockout', 'session', 'logger', 'utilities', 'datepicker', 'knockout.validation'], function (ko, session, logger, utilities) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.session = session;
		self.firstName = ko.observable().extend({ required: true });
		self.lastName = ko.observable().extend({ required: true });
		self.birthDate = ko.observable().extend({ required: true });
		self.feet = ko.observable().extend({ required: true });
		self.inches = ko.observable().extend({ required: true });
		self.gender = ko.observable().extend({ required: true });
		self.genderOptions = [{ value: 'm', text: 'Male' }, { value: 'f', text: 'Female' }];
		self.theme = ko.observable().extend({ required: true });
		self.themeOptions = ['Black', 'Blue', 'Green', 'Purple', 'Red', 'Yellow']

		self.fullName = ko.computed(function () {
			return session.isLoggedIn() ? session.user().fullName : '';
		});
		self.userName = ko.computed(function () {
			return session.isLoggedIn() ? session.user().userName : '';
		});
		self.email = ko.computed(function () {
			return session.isLoggedIn() ? session.user().email : '';
		});
		self.dateCreated = ko.computed(function () {
			return session.isLoggedIn() ? new Date(session.user().dateCreated).toLocaleDateString() : '';
		});

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.firstName, self.lastName, self.birthDate, self.feet, self.inches, self.gender, self.theme]);

		self.updateProfile = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr('disabled', true);

			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/api/accounts/user/me',
				data: {
					FirstName: self.firstName(),
					LastName: self.lastName(),
					DateOfBirth: self.birthDate(),
					Height: CalculateHeight(self.feet(), self.inches()),
					Gender: self.gender().value,
					Theme: self.theme()
				},
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				session.user(data);
				GetProfileFromSession();

				logger.log({
					message: 'Profile updated',
					data: '',
					showToast: true,
					type: 'success'
				});
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

		self.activate = function () {
			GetProfileFromSession();
		};

		self.attached = function () {
			$('#DateOfBirth').datepicker({
				autoclose: true,
				format: 'm/d/yyyy',
				orientation: 'bottom left'
			});

			submit = $('#Submit');
		};

		function GetProfileFromSession() {
			self.firstName(session.user().firstName);
			self.lastName(session.user().lastName)
			self.birthDate(new Date(session.user().dateOfBirth).toLocaleDateString());
			CalculateFromHeight(session.user().height);
			self.gender($.grep(self.genderOptions, function (e) { return e.value == session.user().gender; })[0]);
			self.theme(session.user().theme ? session.user().theme.replace(/^./, session.user().theme[0].toUpperCase()) : 'Blue');
		}

		function CalculateFromHeight(height) {
			self.feet(Math.floor(height / 12));
			self.inches(height % 12);
		}

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
					case 'Theme':
						self.theme.setError(errorMessage);
						break;
				}
			});
			self.validationErrors.showAllMessages();
		}

		return self;
	};

	return viewModel;
});