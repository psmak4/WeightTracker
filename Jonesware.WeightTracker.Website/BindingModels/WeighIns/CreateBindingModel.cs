using System;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.WeighIns
{
	public class CreateBindingModel
	{
		[Required(ErrorMessage = "This field is required.")]
		public decimal? Weight { get; set; }

		[Required(ErrorMessage = "This field is required.")]
		public DateTime? DateRecorded { get; set; }
	}
}