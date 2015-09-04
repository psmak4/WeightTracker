using System.Web.Routing;

namespace System.Web.Mvc
{
	public static class HtmlHelperExtensions
	{
		public static string GetActiveRouteClass(this HtmlHelper html, string routeName)
		{
			var selectedRoute = RouteTable.Routes[routeName] as Route;
			var selectedController = selectedRoute.Defaults["controller"].ToString().ToLower();
			var selectedAction = selectedRoute.Defaults["action"].ToString().ToLower();

			var currentRouteData = html.ViewContext.RouteData.Values;
			var currentController = currentRouteData["controller"].ToString().ToLower();
			var currentAction = currentRouteData["action"].ToString().ToLower();

			return (selectedController == currentController && selectedAction == currentAction) ? "active" : string.Empty;
		}
	}
}