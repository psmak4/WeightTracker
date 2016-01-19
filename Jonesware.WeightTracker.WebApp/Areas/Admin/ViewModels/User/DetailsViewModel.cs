using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.WebApp.Models;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.ViewModels.User
{
	public class DetailsViewModel
	{
		public ApplicationUser User { get; set; }

		public IEnumerable<WeighIn> WeighIns { get; set; }
	}
}