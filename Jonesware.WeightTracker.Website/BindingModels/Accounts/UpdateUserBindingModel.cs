using System;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Accounts
{
	public class UpdateUserBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public string LastName { get; set; }

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