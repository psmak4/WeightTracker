using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.WebApp.ViewModels.WeighIn;
using Microsoft.AspNet.Identity;
using System;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Controllers
{
	public class WeighInController : BaseController
	{
		private IWeighInService weighInService { get; set; }

		public WeighInController()
		{
			weighInService = new WeighInService(new WeightTrackerEntities());
		}

		public ActionResult Create()
		{
			var model = new CreateViewModel();
			model.DateRecorded = DateTime.Now;

			return View(model);
		}

		[HttpPost]
		public ActionResult Create(CreateViewModel model)
		{
			if (ModelState.IsValid)
			{
				try
				{
					var weighIn = weighInService.CreateWeighIn(User.Identity.GetUserId(), model.Weight, model.DateRecorded);
					if (weighIn == null)
						throw new Exception("An erorr has occurred");

					SetSuccessMessage("Weigh in added.");
					return RedirectToAction("Dashboard", "Page");
				}
				catch (Exception ex)
				{
					ModelState.AddModelError("", ex.Message);
				}
			}

			return View();
		}
	}
}