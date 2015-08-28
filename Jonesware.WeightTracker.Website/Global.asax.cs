using System;
using System.Security.Claims;
using System.Web;
using System.Web.Helpers;

namespace Jonesware.WeightTracker.Website
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start(object sender, EventArgs e)
		{
			AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
		}

		protected void Session_Start(object sender, EventArgs e)
		{
		}

		protected void Application_BeginRequest(object sender, EventArgs e)
		{
		}

		protected void Application_AuthenticateRequest(object sender, EventArgs e)
		{
		}

		protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
		{
			//HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
			//
			//if (authCookie != null)
			//{
			//	FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
			//
			//	JavaScriptSerializer serializer = new JavaScriptSerializer();
			//
			//	CustomPrincipalSerializeModel serializeModel = serializer.Deserialize<CustomPrincipalSerializeModel>(authTicket.UserData);
			//
			//	CustomPrincipal newUser = new CustomPrincipal(authTicket.Name);
			//	newUser.Id = serializeModel.Id;
			//	newUser.FirstName = serializeModel.FirstName;
			//	newUser.LastName = serializeModel.LastName;
			//
			//	HttpContext.Current.User = newUser;
			//}
		}

		protected void Application_Error(object sender, EventArgs e)
		{
		}

		protected void Session_End(object sender, EventArgs e)
		{
		}

		protected void Application_End(object sender, EventArgs e)
		{
		}
	}
}