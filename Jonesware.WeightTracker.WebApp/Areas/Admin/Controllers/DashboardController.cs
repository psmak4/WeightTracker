using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.WebApp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.Controllers
{
    public class DashboardController : BaseController
    {
		private IWeighInService weighInService { get; set; }

		public DashboardController()
		{
			weighInService = new WeighInService(new WeightTrackerEntities());
		}

		public ActionResult Index()
        {
            return View();
        }
    }
}