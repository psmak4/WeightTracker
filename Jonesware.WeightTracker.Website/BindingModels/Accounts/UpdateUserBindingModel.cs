using System;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.Accounts
{
	public class UpdateUserBindingModel
	{
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public DateTime DateOfBirth { get; set; }

		[Required]
		public int Height { get; set; }

		[Required]
		[RegularExpression("m|f")]
		public string Gender { get; set; }
	}
}