using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.ViewModels.Account
{
	public class RegisterViewModel
	{
		[Required]
		[DisplayName("Username")]
		[DataType(DataType.Text)]
		public string Username { get; set; }

		[Required]
		[DisplayName("Password")]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required]
		[DisplayName("Confirm")]
		[Compare("Password")]
		[DataType(DataType.Password)]
		public string ConfirmPassword { get; set; }

		[Required]
		[DisplayName("Email")]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }
	}
}