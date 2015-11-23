define(['plugins/router', 'security', 'knockout', 'jquery', 'jquery.utilities'], function (router, security, ko, $) {
	var session = function () {
		var self = this;

		self.user = ko.observable();
		self.accessToken = ko.observable();
		self.isLoggedIn = ko.observable(false);
		//self.baseUrl = 'http://localhost:50347';
		self.baseUrl = '';

		self.gravatar = ko.computed(function () {
			if (self.isLoggedIn())
				return 'http://www.gravatar.com/avatar/' + self.user().emailHash + '?s=160&d=mm';

			return '';
		});

		self.siteTheme = ko.computed(function () {
			var theme = 'skin-blue';
			if (self.isLoggedIn() && self.user().theme) {
				switch (self.user().theme.toLowerCase()) {
					case 'blue':
						theme = 'skin-blue';
						break;
					case 'yellow':
						theme = 'skin-yellow';
						break;
					case 'green':
						theme = 'skin-green';
						break;
					case 'purple':
						theme = 'skin-purple';
						break;
					case 'red':
						theme = 'skin-red';
						break;
					case 'black':
						theme = 'skin-black';
						break;
				}
			}

			return theme;
		}, this);

		self.buttonTheme = ko.computed(function () {
			var theme = 'bg-blue';
			if (self.isLoggedIn() && self.user().theme) {
				switch (self.user().theme.toLowerCase()) {
					case 'blue':
						theme = 'bg-blue';
						break;
					case 'yellow':
						theme = 'bg-yellow';
						break;
					case 'green':
						theme = 'bg-green';
						break;
					case 'purple':
						theme = 'bg-purple';
						break;
					case 'red':
						theme = 'bg-red';
						break;
					case 'black':
						theme = 'bg-black';
						break;
				}
			}

			return theme;
		}, this);

		self.boxTheme = ko.computed(function () {
			var theme = 'box-blue';
			if (self.isLoggedIn() && self.user().theme) {
				switch (self.user().theme.toLowerCase()) {
					case 'blue':
						theme = 'box-blue';
						break;
					case 'yellow':
						theme = 'box-yellow';
						break;
					case 'green':
						theme = 'box-green';
						break;
					case 'purple':
						theme = 'box-purple';
						break;
					case 'red':
						theme = 'box-red';
						break;
					case 'black':
						theme = 'box-black';
						break;
				}
			}

			return theme;
		}, this);

		self.clear = function () {
			self.isLoggedIn(false);
			self.user(null);
			self.accessToken(null);
			localStorage.removeItem('accessToken');
		};

		self.userIsInRole = function (requiredRole) {
			if (requiredRole === undefined)
				return true;

			if (!self.user())
				return false;

			if (self.user().roles.length === 0)
				return false;

			if ($.isArray(requiredRole)) {
				if (requiredRole.length === 0) {
					return true;
				} else {
					return $.arrayIntersect(self.user().roles, requiredRole).length > 0;
				}
			} else {
				return $.inArray(requiredRole, self.user().roles) > -1;
			}
		};

		return self;
	};

	return new session();
});