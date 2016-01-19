using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.WebApp.ViewModels.WeighIn
{
	public class CreateViewModel
	{
		[Required]
		[DefaultValue(0.0)]
		[DisplayName("Weight")]
		[DisplayFormat(DataFormatString = "{0:#.#}", ApplyFormatInEditMode = true)]
		public decimal Weight { get; set; }

		[Required]
		[DataType(DataType.Date)]
		[DisplayName("Date Recorded")]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? DateRecorded { get; set; }
	}
}