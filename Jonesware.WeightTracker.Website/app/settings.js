define(['knockout'], function (ko) {
	return {
		isLoggedIn: ko.observable(false),
		user: ko.observable(),
		token: null,
	};
});