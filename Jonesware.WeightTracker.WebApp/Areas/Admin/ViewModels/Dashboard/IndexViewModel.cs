using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.WebApp.Models;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.ViewModels.Dashboard
{
	public class IndexViewModel
	{
		public int NumUsers { get; set; }

		public int NumWeighIns { get; set; }

		public IEnumerable<ApplicationUser> NewestUsers { get; set; }

		public IEnumerable<WeighIn> MostRecentWeighIns { get; set; }
	}
}