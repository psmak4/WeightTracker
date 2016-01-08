using Jonesware.WeightTracker.WebApp.ViewModels.Shared;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.WebApp.ViewModels.Page
{
	public class DashboardViewModel
	{
		public IEnumerable<WeighInViewModel> WeighIns { get; set; }
		public decimal? MostRecentWeight { get; set; }
		public decimal? BodyMassIndex { get; set; }
		public decimal? BodyFatPercentage { get; set; }
		public string BodyFatIcon { get; set; }
	}
}