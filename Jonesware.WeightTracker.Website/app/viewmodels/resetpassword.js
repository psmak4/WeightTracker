define(['jquery', 'knockout'], function ($, ko) {
	var viewModel = function () {
		var self = this;
		var submit;

		self.userId = ko.observable();
		self.code = ko.observable();
		self.password = ko.observable().extend({ required: true, minLength: 6, maxLength: 100 });
		self.confirmPassword = ko.observable().extend({ required: true, equal: self.password });
		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.password, self.confirmPassword]);
		self.hasSuccess = ko.observable(false);

		self.reset = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr('disabled', true);

			self.error('');
			self.errors.removeAll();
			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/api/accounts/resetpassword',
				data: {
					UserId: self.userId(),
					Password: self.password(),
					ConfirmPassword: self.confirmPassword(),
					Code: self.code()
				}
			})
			.done(function (data) {
				self.hasSuccess(true);
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				if (jqXHR.responseJSON.error_description)
					self.error(jqXHR.responseJSON.error_description);
				else if (jqXHR.responseJSON.modelState)
				{
					var modelState = jqXHR.responseJSON.modelState;
					for (var key in modelState)
					{
						console.log(key + ': ' + modelState[key])
						self.errors.push({ 'key': key, 'value': modelState[key] });
					}
				}
			})
			.always(function () {
				submit.attr('disabled', false);
				submit.text('Submit');
			});
		}

		self.activate = function () {
			self.userId = ko.observable(getQueryString('u'));
			self.code = ko.observable(getQueryString('c'));
		};

		self.attached = function () {
			submit = $('#Submit');
		};

		var getQueryString = function ( field, url ) {
			var href = url ? url : window.location.href;
			var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
			var string = reg.exec(href);
			return string ? string[1] : null;
		};
	};

	return new viewModel();
});