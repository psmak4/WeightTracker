using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Accounts
{
	public class ForgotPasswordBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string CallbackUrl { get; set; }
	}
}