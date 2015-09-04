namespace Jonesware.WeightTracker.Website.Models
{
	public class BodyMassIndex
	{
		public decimal Value
		{
			get
			{
				return (weight * 703) / (height * height);
            }
		}

		private decimal weight { get; set; }
		private int height { get; set; }

		public BodyMassIndex(decimal weight, int height)
		{
			this.weight = weight;
			this.height = height;
		}
	}
}