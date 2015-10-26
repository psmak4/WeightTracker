using Jonesware.WeightTracker.Website.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Web.Http;

namespace Jonesware.WeightTracker.Website.Controllers
{
	public class BaseApiController : ApiController
	{
		private ApplicationUserManager _AppUserManager = null;

		protected ApplicationUserManager AppUserManager
		{
			get
			{
				return _AppUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
			}
		}

		private ApplicationRoleManager _AppRoleManager = null;

		protected ApplicationRoleManager AppRoleManager
		{
			get
			{
				return _AppRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
			}
		}

		public BaseApiController()
		{
		}

		protected IHttpActionResult GetErrorResult(IdentityResult result)
		{
			if (result == null)
				return InternalServerError();

			if (!result.Succeeded)
			{
				if (result.Errors != null)
					foreach (string error in result.Errors)
						ModelState.AddModelError("", error);

				if (ModelState.IsValid)
					return BadRequest();

				return BadRequest(ModelState);
			}

			return null;
		}

		protected void AddErrors(IdentityResult result)
		{
			foreach (var error in result.Errors)
				ModelState.AddModelError("", error);
		}
	}
}