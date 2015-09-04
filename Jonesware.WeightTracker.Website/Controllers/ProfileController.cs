using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.Website.ViewModels.Profile;
using System;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Controllers
{
	[Authorize]
	public class ProfileController : BaseController
	{
		private IUserService userService;
		private IWeighInService weighInService;

		public ProfileController(IUserService userService, IWeighInService weighInService)
		{
			if (userService == null)
				throw new ArgumentNullException("userService");
			this.userService = userService;

			if (weighInService == null)
				throw new ArgumentNullException("weighInService");
			this.weighInService = weighInService;
		}

		public ActionResult Index()
		{
			var user = userService.GetUser(User.UserId);
			var model = new IndexViewModel(user);

			return View(model);
		}

		public ActionResult WeighIns()
		{
			var model = weighInService.GetUserWeighIns(User.UserId);

			return View(model);
		}

		public ActionResult BodyMassIndex()
		{
			var user = userService.GetUser(User.UserId);
			var model = new BodyMassIndexViewModel(user);

			return View(model);
		}

		public ActionResult BodyFatPercentage()
		{
			var user = userService.GetUser(User.UserId);
			var model = new BodyFatPercentageViewModel(user);

			return View(model);
		}
	}
}