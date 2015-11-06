define(['plugins/router', 'jquery', 'knockout', 'session', 'jquery.utilities', 'bootstrap', 'adminLTE'], function (router, $, ko, session) {
	var viewModel = function () {
		var self = this;

		self.router = router;
		self.session = session;

		self.gravatar = ko.computed(function () {
			if (session.isLoggedIn())
				return 'http://www.gravatar.com/avatar/' + session.user().emailHash + '?s=160&d=identicon';

			return '';
		});

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
			router.navigate('/');
			session.clear();
		};

		self.displayRoute = function (route) {
			if (session.isLoggedIn())
				return route.displayAuthenticated;
			else
				return route.displayUnauthenticated;
		};

		function setupRouter() {
			router.map([
				{ route: '', title: 'Index', moduleId: 'viewmodels/index', nav: false },
				{ route: 'login', title: 'Login', moduleId: 'viewmodels/login', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'register', title: 'Register', moduleId: 'viewmodels/register', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'forgotpassword', title: 'Forgot Password', moduleId: 'viewmodels/forgotpassword', nav: false },
				{ route: 'resetpassword', title: 'Reset Password', moduleId: 'viewmodels/resetpassword', nav: false },
				{ route: 'dashboard', moduleId: 'viewmodels/dashboard', title: 'Dashboard', nav: true, requiredRoles: ['User'], displayUnauthenticated: false, displayAuthenticated: true },
				{ route: 'profile', moduleId: 'viewmodels/profile', title: 'Profile', nav: false, requiredRoles: ['User'] }
			]).buildNavigationModel();

			router.guardRoute = function (routeInfo, params, instance) {
				//console.log(params.config.loginRequired, params.config);
				if (typeof (params.config.requiredRoles) === 'undefined')
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