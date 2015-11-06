using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Roles
{
	public class CreateRoleBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		[StringLength(256, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
		[Display(Name = "Role Name")]
		public string Name { get; set; }
	}
}