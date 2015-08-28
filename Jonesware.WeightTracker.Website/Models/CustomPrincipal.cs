using System;
using System.Linq;
using System.Security.Claims;

namespace Jonesware.WeightTracker.Website.Models
{
	public class CustomPrincipal : ClaimsPrincipal
	{
		public CustomPrincipal(ClaimsPrincipal principal) : base(principal)
		{
		}

		public int UserId
		{
			get
			{
				return Convert.ToInt32(this.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value);
			}
		}

		public string Username
		{
			get
			{
				return this.Claims.Where(c => c.Type == ClaimTypes.Name).FirstOrDefault().Value;
			}
		}

		public string Email
		{
			get
			{
				return this.Claims.Where(c => c.Type == ClaimTypes.Email).FirstOrDefault().Value;
			}
		}
	}
}