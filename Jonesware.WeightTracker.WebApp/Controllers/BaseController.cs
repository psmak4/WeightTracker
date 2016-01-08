using Jonesware.WeightTracker.WebApp.Models;
using Jonesware.WeightTracker.WebApp.ViewModels.Page;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Controllers
{
	public class BaseController : Controller
	{
		protected ApplicationSignInManager SignInManager
		{
			get
			{
				return HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
			}
		}

		protected ApplicationUserManager UserManager
		{
			get
			{
				return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
			}
		}

		protected IAuthenticationManager AuthenticationManager
		{
			get
			{
				return HttpContext.GetOwinContext().Authentication;
			}
		}

		protected void SetErrorMessage(string message)
		{
			SetMessage(MessageType.Error, message);
		}

		protected void SetInfoMessage(string message)
		{
			SetMessage(MessageType.Info, message);
		}

		protected void SetSuccessMessage(string message)
		{
			SetMessage(MessageType.Success, message);
		}

		protected void SetWarningMessage(string message)
		{
			SetMessage(MessageType.Warning, message);
		}

		private void SetMessage(MessageType type, string text)
		{
			var messages = TempData["Messages"] == null ? new List<Message>() : (List<Message>)TempData["Messages"];

			messages.Add(new Message()
			{
				Type = type,
				Text = text
			});

			TempData["Messages"] = messages;
		}
	}
}