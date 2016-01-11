using Jonesware.WeightTracker.WebApp.Models;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.ViewModels.User
{
	public class IndexViewModel
	{
		public IEnumerable<ApplicationUser> Users { get; set; }
	}
}