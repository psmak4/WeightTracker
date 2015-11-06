using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Jonesware.WeightTracker.Website.Identity
{
	public class ApplicationUser : IdentityUser
	{
		[Required]
		[MaxLength(100)]
		public string FirstName { get; set; }

		[Required]
		[MaxLength(100)]
		public string LastName { get; set; }

		[Required]
		public DateTime DateOfBirth { get; set; }

		[Required]
		public int Height { get; set; }

		[Required]
		[MaxLength(1)]
		public string Gender { get; set; }

		[Required]
		public DateTime DateCreated { get; set; }

		[Required]
		public string Theme { get; set; }

		public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
		{
			var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
			// Add custom user claims here
			return userIdentity;
		}
	}
}