using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Website.Models;
using System;
using System.Linq;

namespace Jonesware.WeightTracker.Website.ViewModels.Profile
{
	public class BodyFatPercentageViewModel
	{
		public bool CanCalculate { get; set; }
		public BodyFatPercentage BFP { get; set; }

		public BodyFatPercentageViewModel(User user)
		{
			CanCalculate = user.WeighIns.Any() && user.Height.HasValue && user.DateOfBirth.HasValue && !string.IsNullOrWhiteSpace(user.Gender);
			if (CanCalculate)
			{
				var weight = user.WeighIns.OrderByDescending(w => w.DateRecorded).First().Weight;

				var height = user.Height.Value;

				var today = DateTime.Today;
				var age = today.Year - user.DateOfBirth.Value.Year;
				if (user.DateOfBirth.Value > today.AddYears(-age))
					age--;

				var gender = user.Gender;

				BFP = new BodyFatPercentage(weight, height, age, gender);
			}
		}
	}
}