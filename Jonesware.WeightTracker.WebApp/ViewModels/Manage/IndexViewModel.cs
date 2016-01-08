using Jonesware.WeightTracker.WebApp.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.WebApp.ViewModels.Manage
{
	public class IndexViewModel
	{
		public bool HasPassword { get; set; }
		public IList<UserLoginInfo> Logins { get; set; }
		public string PhoneNumber { get; set; }
		public bool TwoFactor { get; set; }
		public bool BrowserRemembered { get; set; }

		[Required()]
		[DisplayName("First Name")]
		public string FirstName { get; set; }

		[Required()]
		[DisplayName("Last Name")]
		public string LastName { get; set; }

		[Required()]
		[DisplayName("Birthdate")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateOfBirth { get; set; }

		[Required()]
		[DisplayName("Feet")]
		public int Feet { get; set; }

		[Required()]
		[DisplayName("Inches")]
		public int Inches { get; set; }

		[Required()]
		[DisplayName("Gender")]
		public string Gender { get; set; }

		[Required()]
		[DisplayName("Theme")]
		public string Theme { get; set; }
	}
}