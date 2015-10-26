using Jonesware.WeightTracker.Website.Models;

namespace Jonesware.WeightTracker.Website.ApiModels.WeighIns
{
	public class BodyMassIndexApiModel
	{
		public bool CanCalculate { get; set; }

		public BodyMassIndex BMI { get; set; }

		public BodyMassIndexApiModel(decimal? weight, int? height)
		{
			CanCalculate = weight.HasValue && height.HasValue;
			if (CanCalculate)
			{
				BMI = new BodyMassIndex(weight.Value, height.Value);
			}
		}
	}
}