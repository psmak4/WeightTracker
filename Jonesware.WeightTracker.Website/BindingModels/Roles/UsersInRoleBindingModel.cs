using System.Collections.Generic;

namespace Jonesware.WeightTracker.Website.BindingModels.Roles
{
	public class UsersInRoleBindingModel
	{
		public string Id { get; set; }
		public List<string> EnrolledUsers { get; set; }
		public List<string> RemovedUsers { get; set; }
	}
}