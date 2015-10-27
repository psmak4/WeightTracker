define(['plugins/router', 'security', 'knockout', 'jquery', 'jquery.utilities'], function (router, security, ko, $) {
	var session = function () {
		var self = this;

		self.user = ko.observable();
		self.accessToken = ko.observable();
		self.isLoggedIn = ko.observable(false);
		self.baseUrl = 'http://localhost:50347';

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

		//self.userName = ko.observable(undefined);
		//self.email = ko.observable(undefined);
		//self.isBusy = ko.observable(false);
		//self.userRoles = ko.observableArray();
		//self.archiveSessionStorageToLocalStorage = archiveSessionStorageToLocalStorage;
		//self.isAuthCallback = isAuthCallback;
		//self.userRemembered = userRemembered;
		//self.rememberedToken = rememberedToken;

		return self;
	};

	return new session();

	function isAuthCallback() {
		return sessionStorage["associatingExternalLogin"] || sessionStorage["externalLogin"];
	}

	function userRemembered() {
		return sessionStorage["accessToken"] !== undefined || localStorage["accessToken"] !== undefined;
	}

	function redirectCallback(redirectToManage) {
		if (redirectToManage) {
			router.navigate('#/manage', 'replace');
		} else {
			router.navigate('#/', 'replace');
		}
	}

	function archiveSessionStorageToLocalStorage() {
		var backup = {};

		for (var i = 0; i < sessionStorage.length; i++) {
			backup[sessionStorage.key(i)] = sessionStorage[sessionStorage.key(i)];
		}

		localStorage["sessionStorageBackup"] = JSON.stringify(backup);
		sessionStorage.clear();
	}
});