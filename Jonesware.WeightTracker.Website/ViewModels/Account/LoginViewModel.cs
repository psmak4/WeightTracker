using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.ViewModels.Account
{
	public class LoginViewModel
	{
		[Required]
		[DisplayName("Username")]
		[DataType(DataType.Text)]
		public string Username { get; set; }

		[Required]
		[DisplayName("Password")]
		[DataType(DataType.Password)]
		public string Password { get; set; }
	}
}