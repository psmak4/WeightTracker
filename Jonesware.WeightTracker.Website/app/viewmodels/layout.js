define(['plugins/router', 'jquery', 'knockout', 'session', 'jquery.utilities', 'bootstrap', 'adminLTE'], function (router, $, ko, session) {
	var viewModel = function () {
		var self = this;

		self.router = router;
		self.session = session;

		self.fullName = ko.computed(function () {
			return session.isLoggedIn() ? session.user().fullName : '';
		});
		self.dateJoined = ko.computed(function () {
			if (session.isLoggedIn())
				return session.user().dateCreated;

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
			var prev = 0;
			var $window = $(window);
			var nav = $('.navbar-header');

			$window.on('scroll', function () {
				var scrollTop = $window.scrollTop();
				nav.toggleClass('shrink', (scrollTop > nav.height()) && (scrollTop > prev));
				prev = scrollTop;
			});
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
				{ route: '', title: 'Home', moduleId: 'viewmodels/index', nav: false },
				{ route: 'login', title: 'Login', moduleId: 'viewmodels/login', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'register', title: 'Register', moduleId: 'viewmodels/register', nav: true, displayUnauthenticated: true, displayAuthenticated: false },
				{ route: 'forgotpassword', title: 'Forgot Password', moduleId: 'viewmodels/forgotpassword', nav: false },
				{ route: 'resetpassword', title: 'Reset Password', moduleId: 'viewmodels/resetpassword', nav: false },
				{ route: 'dashboard', moduleId: 'viewmodels/dashboard', title: 'Dashboard', nav: true, requiredRoles: ['User'], displayUnauthenticated: false, displayAuthenticated: true },
				{ route: 'profile', moduleId: 'viewmodels/profile', title: 'Profile', nav: false, requiredRoles: ['User'] }
			]).buildNavigationModel();

			router.guardRoute = function (routeInfo, params, instance) {
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