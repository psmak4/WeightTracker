using System;

namespace Jonesware.WeightTracker.Website.ApiModels.WeighIns
{
	public class WeighInApiModel
	{
		public int Id { get; set; }
		public string UserId { get; set; }
		public decimal Weight { get; set; }
		public DateTime DateRecorded { get; set; }
	}
}