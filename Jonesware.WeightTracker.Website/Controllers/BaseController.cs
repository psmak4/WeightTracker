using Jonesware.WeightTracker.Website.Models;
using System.Security.Claims;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Controllers
{
	public abstract class BaseController : Controller
	{
		private CustomPrincipal _user;

		protected virtual new CustomPrincipal User
		{
			get
			{
				if (_user == null)
				{
					_user = new CustomPrincipal(ClaimsPrincipal.Current);
				}

				return _user;
			}
		}
	}
}