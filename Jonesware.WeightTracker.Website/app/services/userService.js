define(['jquery'], function ($) {
	var userService = function () {
		var self = this;

		self.GetCurrentUserInfo = function (accessToken) {
			return $.ajax({
				method: "GET",
				url: '/api/accounts/user/me',
				headers: {
					Authorization: 'Bearer ' + accessToken
				}
			});
		};

		return self;
	};

	return new userService();
});