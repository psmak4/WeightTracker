using Jonesware.WeightTracker.Website.Models;

namespace Jonesware.WeightTracker.Website.ApiModels.WeighIns
{
	public class StatsApiModel
	{
		public bool CanCalculate { get; set; }

		public BodyFatPercentage BodyFat { get; set; }

		public decimal? Weight { get; set; }

		public StatsApiModel(decimal? weight, int? height, int? age, string gender)
		{
			CanCalculate = weight.HasValue && height.HasValue && age.HasValue && !string.IsNullOrWhiteSpace(gender);
			if (CanCalculate)
			{
				Weight = weight;
				BodyFat = new BodyFatPercentage(weight.Value, height.Value, age.Value, gender);
			}
		}
	}
}