using Jonesware.WeightTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jonesware.WeightTracker.Website.ViewModels.Profile
{
	public class IndexViewModel
	{
		public string BirthDate { get; set; }

		public string BirthYear { get; set; }

		public string Height { get; set; }

		public string Gender { get; set; }

		public IndexViewModel(User user)
		{
			BirthDate = user.DateOfBirth.HasValue ? string.Format("{0} {1}", user.DateOfBirth.Value.ToString("MMMM"), user.DateOfBirth.Value.Day) : string.Empty;
			BirthYear = user.DateOfBirth.HasValue ? user.DateOfBirth.Value.Year.ToString() : string.Empty;
			Height = user.Height.HasValue ? string.Format("{0}' {1}\"", (int)(user.Height.Value / 12), (int)(user.Height.Value % 12)) : string.Empty;
			Gender = string.IsNullOrWhiteSpace(user.Gender) ? string.Empty : user.Gender.ToLower() == "m" ? "Male" : user.Gender.ToLower() == "f" ? "Female" : string.Empty ;
		}
	}
}
