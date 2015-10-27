define(['plugins/router', 'jquery', 'knockout', 'session', 'jquery.utilities', 'bootstrap', 'adminLTE'], function (router, $, ko, session) {
	var viewModel = function () {
		var self = this;

		self.router = router;
		self.session = session;

		self.fullName = ko.computed(function () {
			if (session.isLoggedIn())
				return session.user().fullName;

			return '';
		});
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

		self.toggleControlSidebar = function () {
			$('.control-sidebar').toggleClass('control-sidebar-open');
		};

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