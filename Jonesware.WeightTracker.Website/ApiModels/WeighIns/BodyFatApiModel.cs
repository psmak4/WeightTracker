using Jonesware.WeightTracker.Website.Models;

namespace Jonesware.WeightTracker.Website.ApiModels.WeighIns
{
	public class BodyFatApiModel
	{
		public bool CanCalculate { get; set; }

		public BodyFatPercentage BodyFat { get; set; }

		public BodyFatApiModel(decimal? weight, int? height, int? age, string gender)
		{
			CanCalculate = weight.HasValue && height.HasValue && age.HasValue && !string.IsNullOrWhiteSpace(gender);
			if (CanCalculate)
			{
				BodyFat = new BodyFatPercentage(weight.Value, height.Value, age.Value, gender);
			}
		}
	}
}