using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Jonesware.WeightTracker.Website.ApiModels.Accounts
{
	public class UserApiModel
	{
		public string Url { get; set; }
		public string Id { get; set; }
		public string UserName { get; set; }
		public string FullName { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string EmailHash { get; set; }
		public bool EmailConfirmed { get; set; }
		public DateTime DateOfBirth { get; set; }
		public int Height { get; set; }
		public string Gender { get; set; }
		public DateTime DateCreated { get; set; }
		public IList<string> Roles { get; set; }
		public IList<Claim> Claims { get; set; }
	}
}