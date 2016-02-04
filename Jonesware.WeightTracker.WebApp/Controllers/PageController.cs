using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.WebApp.ViewModels.Page;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Jonesware.WeightTracker.Model;
using System;
using Jonesware.WeightTracker.WebApp.ViewModels.Shared;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.WebApp.Controllers
{
	public class PageController : BaseController
	{
		private IWeighInService weighInService { get; set; }

		public PageController()
		{
			weighInService = new WeighInService(new WeightTrackerEntities());
		}

		public ActionResult Index()
		{
			return View();
		}

		[Authorize]
		public ActionResult Dashboard()
		{
			var model = new DashboardViewModel();
			var weighIns = weighInService.GetUserWeighIns(User.Identity.GetUserId()).OrderByDescending(w => w.DateRecorded);
			model.WeighIns = GetWeighInsViewModels(weighIns);

			if (weighIns.Any())
			{
				decimal? weight = weighIns.Any() ? weighIns.First().Weight : new decimal?();
				model.MostRecentWeight = weight;

				var bodyFat = new BodyFatPercentage(weight.Value, User.Identity.GetHeight(), GetAge(User.Identity.GetDateOfBirth()).Value, User.Identity.GetGender());
				model.BodyMassIndex = bodyFat.BMI.Value;
				model.BodyFatPercentage = bodyFat.Value;

				model.ChartMin = (weighIns.Min(w => w.Weight) / 5) * 5;
				model.ChartMax = ((weighIns.Max(w => w.Weight) / 5) * 5) + 5;
			}
			else
			{
				model.ChartMin = 0;
				model.ChartMax = 0;
			}
			model.BodyFatIcon = User.Identity.GetGender() == "m" ? "fa-male" : "fa-female";

			return View(model);
		}

		[ChildActionOnly]
		public ActionResult Messages()
		{
			var model = TempData["Messages"] == null ? new List<Message>() : (List<Message>)TempData["Messages"];

			return PartialView(model);
		}

		private int? GetAge(DateTime dateOfBirth)
		{
			DateTime today = DateTime.Today;
			int age = today.Year - dateOfBirth.Year;
			if (dateOfBirth > today.AddYears(-age))
				age--;

			return new int?(age);
		}

		private IEnumerable<WeighInViewModel> GetWeighInsViewModels(IEnumerable<WeighIn> weighIns)
		{
			var model = new List<WeighInViewModel>();
			foreach(var weighIn in weighIns)
			{
				model.Add(new WeighInViewModel()
				{
					Id = weighIn.Id,
					DateRecorded = weighIn.DateRecorded,
					UserId = weighIn.UserId,
					Weight = weighIn.Weight
				});
			}

			return model;
		}
	}
}