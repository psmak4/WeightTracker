define(['plugins/router', 'jquery', 'knockout', 'session', 'jquery.utilities', 'bootstrap', 'semantic'], function (router, $, ko, session) {
	var viewModel = function () {
		var self = this;

		self.router = router;
		self.session = session;
		self.userName = ko.observable();
		self.fullName = ko.observable();
		self.gravatar = ko.observable();

		self.activate = function () {
			var dfd = $.Deferred();

			var accessToken = session.accessToken() || localStorage.getItem('accessToken');
			if (accessToken !== null) {
				$.ajax({
					method: "GET",
					url: session.baseUrl + '/api/accounts/user/me',
					headers: {
						Authorization: 'Bearer ' + accessToken
					}
				}).done(function (data) {
					session.accessToken(accessToken);
					session.user(data);
					session.isLoggedIn(true);
					self.userName(session.user().userName);
					self.fullName(session.user().fullName);
					self.gravatar('http://www.gravatar.com/avatar/' + session.user().emailHash + '?s=50&d=identicon');
				}).fail(function (jqXHR, textStatus, errorThrown) {
					session.clear();
				}).always(function () {
					setupRouter().done(function () {
						dfd.resolve();
					});
				});
			} else {
				setupRouter().done(function () {
					dfd.resolve();
				});
			}

			return dfd.promise();
		};

		self.attached = function () {
			//$(function () {
			//	$('.nav.navbar-nav a').click(function () {
			//		$('.collapse').collapse('hide');
			//		alert('here');
			//	});
			//})();
		}

		self.logout = function () {
			session.clear();
			router.navigate('/');
		};

		self.displayRoute = function (route) {
			if (session.isLoggedIn())
				return route.displayAuthenticated;
			else
				return route.displayUnauthenticated;
		};

		self.displayEditProfile = function () {
			$('aside').addClass('in');
		};

		self.hideEditProfile = function () {
			$('aside').removeClass('in');
		}

		function setupRouter() {
			router.map([
				{ route: '', title: 'Index', moduleId: 'viewmodels/index', nav: false },
				{ route: 'login', title: 'Login', moduleId: 'viewmodels/login', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'register', title: 'Register', moduleId: 'viewmodels/register', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'forgotpassword', title: 'Forgot Password', moduleId: 'viewmodels/forgotpassword', nav: false },
				{ route: 'resetpassword', title: 'Reset Password', moduleId: 'viewmodels/resetpassword', nav: false },
				{ route: 'weighins', moduleId: 'viewmodels/weighins', title: 'Weigh Ins', nav: true, requiredRoles: ['User'], displayUnauthenticated: false, displayAuthenticated: true },
				{ route: 'stats', moduleId: 'viewmodels/stats', title: 'Statistics', nav: true, requiredRoles: ['User'], displayUnauthenticated: false, displayAuthenticated: true },
			]).buildNavigationModel();

			router.guardRoute = function (routeInfo, params, instance) {
				console.log(params.config.loginRequired, params.config);
				if (typeof (params.config.requiredRoles) === "undefined")
					return true;

				var res = session.userIsInRole(params.config.requiredRoles);
				if (!res)
					return '/login';

				return res;
			};

			return router.activate({ pushState: true });
		}
	};

	return new viewModel();
});