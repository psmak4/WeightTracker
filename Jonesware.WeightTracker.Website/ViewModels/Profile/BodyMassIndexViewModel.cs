using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Website.Models;
using System.Linq;

namespace Jonesware.WeightTracker.Website.ViewModels.Profile
{
	public class BodyMassIndexViewModel
	{
		public bool CanCalculate { get; set; }

		public BodyMassIndex BMI { get; set; }

		public BodyMassIndexViewModel(User user)
		{
			CanCalculate = user.WeighIns.Any() && user.Height.HasValue;
			if (CanCalculate)
			{
				var weight = user.WeighIns.OrderByDescending(w => w.DateRecorded).First().Weight;
				var height = user.Height.Value;
				BMI = new BodyMassIndex(weight, height);
			}
		}
	}
}