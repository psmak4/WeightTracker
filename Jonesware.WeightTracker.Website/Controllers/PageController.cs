using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Controllers
{
	public class PageController : Controller
	{
		public PageController()
		{
		}

		public ActionResult Index()
		{
			return View();
		}
	}
}