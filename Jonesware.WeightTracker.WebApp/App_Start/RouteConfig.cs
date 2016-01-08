using System.Web.Mvc;
using System.Web.Routing;

namespace Jonesware.WeightTracker.WebApp
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute(
				name: "Dashboard",
				url: "dashboard",
				defaults: new { controller = "Page", action = "Dashboard", id = UrlParameter.Optional }
			);
			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Page", action = "Index", id = UrlParameter.Optional }
			);
		}
	}
}