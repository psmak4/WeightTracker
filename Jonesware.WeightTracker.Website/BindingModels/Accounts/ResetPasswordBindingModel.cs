using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Accounts
{
	public class ResetPasswordBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		public string UserId { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		[DataType(DataType.Password)]
		[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		public string ConfirmPassword { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string Code { get; set; }
	}
}