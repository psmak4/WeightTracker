using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.ViewModels.WeighIns
{
	public class CreateViewModel
	{
		[Required]
		[DisplayName("Weight")]
		public decimal Weight { get; set; }

		[Required]
		[DisplayName("Date")]
		[DataType(DataType.Date)]
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
		public DateTime DateRecorded { get; set; }

		public CreateViewModel()
		{
			DateRecorded = DateTime.Now;
		}
	}
}