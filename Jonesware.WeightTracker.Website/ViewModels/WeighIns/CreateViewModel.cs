using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.ViewModels.WeighIns
{
	public class CreateViewModel
	{
		[Required]
		[DisplayName("Weight")]
		public int Weight { get; set; }

		[Required]
		[DisplayName("Date")]
		[DataType(DataType.Date)]
		public DateTime DateRecorded { get; set; }
	}
}