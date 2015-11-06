using System;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Accounts
{
	public class CreateUserBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		[EmailAddress]
		public string Email { get; set; }

		[Required(ErrorMessage = "This field is required")]
		public string Username { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string LastName { get; set; }

		[Required(ErrorMessage = "This field is required")]
		[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		[DataType(DataType.Password)]
		[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		public string ConfirmPassword { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public DateTime? DateOfBirth { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public int? Height { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		[RegularExpression("m|f")]
		public string Gender { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string Theme { get; set; }
	}
}