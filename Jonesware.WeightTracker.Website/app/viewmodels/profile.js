define(['knockout', 'session', 'logger', 'utilities', 'datepicker', 'knockout.validation'], function (ko, session, logger, utilities) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.userName = ko.observable();
		self.email = ko.observable();
		self.name = ko.observable();
		self.firstName = ko.observable();
		self.firstNameEdit = ko.observable().extend({ required: true });
		self.lastName = ko.observable();
		self.lastNameEdit = ko.observable().extend({ required: true });
		self.birthDate = ko.observable();
		self.birthDateEdit = ko.observable().extend({ required: true, date: true });
		self.height = ko.observable();
		self.heightEdit = ko.observable().extend({ required: true, number: true });
		self.heightText = ko.observable();
		self.gender = ko.observable();
		self.genderEdit = ko.observable().extend({ required: true });
		self.genderText = ko.observable();
		self.genderOptions = [{ value: 'm', text: 'Male' }, { value: 'f', text: 'Female' }];
		self.dateJoined = ko.observable();

		self.viewMode = ko.observable('view');

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.newWeighInWeight, self.newWeighInDate]);

		self.editProfile = function () {
			self.firstNameEdit(self.firstName());
			self.lastNameEdit(self.lastName());
			self.birthDateEdit(self.birthDate());
			self.heightEdit(self.height());
			self.genderEdit($.grep(self.genderOptions, function (e) { return e.value == self.gender(); })[0]);

			self.viewMode('edit');

			var date = new Date(self.birthDate());
			$('#DateOfBirth').datepicker('setDate', date);
		};

		self.cancelEdit = function () {
			self.viewMode('view');
		}

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
					FirstName: self.firstNameEdit(),
					LastName: self.lastNameEdit(),
					DateOfBirth: self.birthDateEdit(),
					Height: self.heightEdit(),
					Gender: self.genderEdit().value
				},
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				session.user(data);
				GetProfileFromSession();

				submit.attr('disabled', false);
				submit.text('Submit');

				self.viewMode('view');

				logger.log({
					message: 'Profile updated',
					data: '',
					showToast: true,
					type: 'success'
				});
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
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
				orientation: 'top left'
			});

			submit = $('#Submit');
		};

		function GetProfileFromSession() {
			self.userName(session.user().userName);
			self.email(session.user().email);
			self.name(session.user().fullName);
			self.firstName(session.user().firstName);
			self.lastName(session.user().lastName);
			self.birthDate(new Date(session.user().dateOfBirth).toLocaleDateString());
			self.height(session.user().height);
			self.heightText(CalculateHeight(session.user().height));
			self.gender(session.user().gender);
			self.genderText(session.user().gender === 'm' ? 'Male' : 'Female');
			self.dateJoined(new Date(session.user().dateCreated).toLocaleDateString());
		}

		function CalculateHeight(height) {
			var feet, inches;

			feet = Math.floor(height / 12);
			inches = height % 12;

			return feet + '\' ' + inches + '"';
		}

		return self;
	};

	return new viewModel();
});