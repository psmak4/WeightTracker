using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.WebApp.Areas.Admin.ViewModels.Dashboard;
using Jonesware.WeightTracker.WebApp.Controllers;
using System.Linq;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.Controllers
{
	[Authorize(Roles = "Admin")]
	public class DashboardController : BaseController
	{
		private IWeighInService weighInService { get; set; }

		public DashboardController()
		{
			weighInService = new WeighInService(new WeightTrackerEntities());
		}

		public ActionResult Index()
		{
			var model = new IndexViewModel()
			{
				NumUsers = UserManager.Users.Count(),
				NumWeighIns = weighInService.GetTotalWeighIns(),
				NewestUsers = UserManager.Users.OrderByDescending(u => u.DateCreated).Take(8),
				MostRecentWeighIns = weighInService.GetMostRecentWeighIns()
			};

			return View(model);
		}
	}
}