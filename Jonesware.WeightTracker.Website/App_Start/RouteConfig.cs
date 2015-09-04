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
				defaults: new { controller = "Profile", action = "WeighIns" }
			);
			routes.MapRoute(
				name: "NewWeighIn",
				url: "weighins/new",
				defaults: new { controller = "WeighIns", action = "Create" }
			);
			routes.MapRoute(
				name: "Profile",
				url: "profile",
				defaults: new { controller = "Profile", action = "Index" }
			);
			routes.MapRoute(
				name: "BodyMassIndex",
				url: "bodymassindex",
				defaults: new { controller = "Profile", action = "BodyMassIndex" }
			);
			routes.MapRoute(
				name: "BodyFatPercentage",
				url: "bodyfatpercentage",
				defaults: new { controller = "Profile", action = "BodyFatPercentage" }
			);
			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Page", action = "Index", id = UrlParameter.Optional }
			);
		}
	}
}