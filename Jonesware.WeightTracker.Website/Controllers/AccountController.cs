using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Website.ViewModels.Account;
using JonesWare.WeightTracker.Services.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Controllers
{
	public class AccountController : BaseController
	{
		private IUserService userService;

		private IAuthenticationManager authentication { get { return HttpContext.GetOwinContext().Authentication; } }

		public AccountController(IUserService userService)
		{
			if (userService == null)
				throw new ArgumentNullException("userService");
			this.userService = userService;
		}

		public ActionResult Register()
		{
			var model = new RegisterViewModel();

			return View(model);
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Register(RegisterViewModel model)
		{
			if (ModelState.IsValid)
			{
				try
				{
					var user = userService.CreateUser(model.Username, model.Password, model.Email);
					//CreateAuthCookie(user);

					return RedirectToRoute("Home");
				}
				catch (Exception ex)
				{
					ModelState.AddModelError("", ex);
				}
			}

			return View(model);
		}

		public ActionResult Login()
		{
			var model = new LoginViewModel();

			return View(model);
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Login(LoginViewModel model)
		{
			if (ModelState.IsValid)
			{
				try
				{
					var user = userService.GetActiveUser(model.Username, model.Password);
					SignIn(user);

					return RedirectToRoute("WeighIns");
				}
				catch (Exception ex)
				{
					ModelState.AddModelError("", ex);
				}
			}

			return View(model);
		}

		public ActionResult Logout()
		{
			authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
			return RedirectToRoute("Home");
		}

		private void SignIn(User user)
		{
			var claims = new List<Claim>
					{
						new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
						new Claim(ClaimTypes.Name, user.Username),
						new Claim(ClaimTypes.Email, user.Email)
					};
			var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie, ClaimTypes.Name, ClaimTypes.Role);
			authentication.SignIn(new AuthenticationProperties() { IsPersistent = false }, identity);
		}
	}
}