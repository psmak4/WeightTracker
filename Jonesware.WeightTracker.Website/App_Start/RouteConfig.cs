using System.Web.Mvc;
using System.Web.Routing;

namespace Jonesware.WeightTracker.Website
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
			routes.MapRoute(
				name: "Register",
				url: "register",
				defaults: new { controller = "Account", action = "Register" }
			);
			routes.MapRoute(
				name: "Login",
				url: "login",
				defaults: new { controller = "Account", action = "Login" }
			);
			routes.MapRoute(
				name: "Logout",
				url: "logout",
				defaults: new { controller = "Account", action = "Logout" }
			);
			routes.MapRoute(
				name: "Home",
				url: "",
				defaults: new { controller = "Page", action = "Index" }
			);
			routes.MapRoute(
				name: "WeighIns",
				url: "weighins",
				defaults: new { controller = "WeighIns", action = "Index" }
			);
			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Page", action = "Index", id = UrlParameter.Optional }
			);
		}
	}
}