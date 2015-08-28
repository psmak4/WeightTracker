using Autofac.Integration.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System.Web.Mvc;
using System.Web.Routing;

[assembly: OwinStartup(typeof(Jonesware.WeightTracker.Website.Startup))]

namespace Jonesware.WeightTracker.Website
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var container = AutofacConfig.Register();
			app.UseAutofacMiddleware(container);
			app.UseAutofacMvc();
			DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
			RouteConfig.RegisterRoutes(RouteTable.Routes);

			app.UseCookieAuthentication(new CookieAuthenticationOptions()
			{
				AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
				LoginPath = new PathString("/login")
			});
		}
	}
}