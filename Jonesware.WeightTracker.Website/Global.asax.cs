using System;
using System.Web;
using System.Web.Http;

namespace Jonesware.WeightTracker.Website
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start(object sender, EventArgs e)
		{
			GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
		}
	}
}