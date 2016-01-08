using Jonesware.WeightTracker.WebApp.Models;
using System;
using System.Security.Claims;
using System.Security.Principal;

namespace Microsoft.AspNet.Identity
{
	public static class IdentityHelpers
	{
		public static string GetFirstName(this IIdentity identity)
		{
			return ((ClaimsIdentity)identity).FindFirst("FirstName").Value;
		}

		public static string GetLastName(this IIdentity identity)
		{
			return ((ClaimsIdentity)identity).FindFirst("LastName").Value;
		}

		public static DateTime GetDateOfBirth(this IIdentity identity)
		{
			var claimsIdentity = (ClaimsIdentity)identity;
			var claim = claimsIdentity.FindFirst("DateOfBirth");
			var date = Convert.ToDateTime(claim.Value); 
			return date;
		}

		public static int GetHeight(this IIdentity identity)
		{
			return int.Parse(((ClaimsIdentity)identity).FindFirst("Height").Value);
		}

		public static string GetGender(this IIdentity identity)
		{
			return ((ClaimsIdentity)identity).FindFirst("Gender").Value;
		}

		public static DateTime GetDateCreated(this IIdentity identity)
		{
			return Convert.ToDateTime(((ClaimsIdentity)identity).FindFirst("DateCreated").Value);
		}

		public static string GetTheme(this IIdentity identity)
		{
			return ((ClaimsIdentity)identity).FindFirst("Theme").Value;
		}
	}
}