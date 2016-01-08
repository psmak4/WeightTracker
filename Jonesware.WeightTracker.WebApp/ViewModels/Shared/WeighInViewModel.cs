using System;

namespace Jonesware.WeightTracker.WebApp.ViewModels.Shared
{
	public class WeighInViewModel
	{
		public int Id { get; set; }
		public string UserId { get; set; }
		public decimal Weight { get; set; }
		public DateTime DateRecorded { get; set; }
	}
}