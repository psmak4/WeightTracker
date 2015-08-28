using Jonesware.WeightTracker.Website.ViewModels.WeighIns;
using JonesWare.WeightTracker.Services.Interfaces;
using System;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Controllers
{
	public class WeighInsController : BaseController
	{
		private IWeighInService weighInService;

		public WeighInsController(IWeighInService weighInService)
		{
			if (weighInService == null)
				throw new ArgumentNullException("weighInService");
			this.weighInService = weighInService;
		}

		public ActionResult Index()
		{
			var model = weighInService.GetUserWeighIns(User.UserId);

			return View(model);
		}

		public ActionResult Create()
		{
			var model = new CreateViewModel();

			return View(model);
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Create(CreateViewModel model)
		{
			if (ModelState.IsValid)
			{
				try
				{
					weighInService.CreateWeighIn(User.UserId, model.Weight, model.DateRecorded);

					return RedirectToRoute("WeighIns");
				}
				catch (Exception ex)
				{
					ModelState.AddModelError("", ex);
				}
			}

			return View(model);
		}
	}
}