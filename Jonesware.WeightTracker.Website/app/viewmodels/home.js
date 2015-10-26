define(['plugins/router', 'knockout', 'session'], function (router, ko, session) {
	var homeRouter = router.createChildRouter().makeRelative({
		moduleId: '',
		fromParent: true
	})
	.map([
		{ route: '', moduleId: 'viewmodels/weighins', title: 'Weigh Ins', nav: true },
		{ route: 'stats', moduleId: 'viewmodels/stats', title: 'Statistics', nav: true },
		{ route: 'profile', moduleId: 'viewmodels/profile', title: 'Profile', nav: true },
	])
	.buildNavigationModel();

	var viewModel = function () {
		var self = this;

		self.fullName = undefined;
		self.userName = undefined;
		self.gravatar = undefined;
		self.router = homeRouter;

		self.activate = function () {
			self.fullName = session.user().fullName;
			self.userName = session.user().userName;
			self.gravatar = 'http://www.gravatar.com/avatar/' + session.user().emailHash + '?s=263&d=identicon';
		};
	};

	return new viewModel();
});