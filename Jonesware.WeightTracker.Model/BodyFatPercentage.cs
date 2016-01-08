namespace Jonesware.WeightTracker.Model
{
	public class BodyFatPercentage
	{
		public decimal Value
		{
			get
			{
				return (bmiModifier * BMI.Value) + (ageModifier * age) - (genderModifier * gender) - 9;
			}
		}

		public BodyMassIndex BMI { get; set; }
		private int age;
		private int gender;
		private const decimal bmiModifier = 1.39m;
		private const decimal ageModifier = 0.16m;
		private const decimal genderModifier = 10.34m;

		public BodyFatPercentage(decimal weight, int height, int age, string gender)
		{
			BMI = new BodyMassIndex(weight, height);
			this.age = age;
			this.gender = gender == "m" ? 1 : 0;
		}
	}
}