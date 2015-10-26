using System;
using System.ComponentModel.DataAnnotations;

namespace Jonesware.WeightTracker.Website.BindingModels.WeighIns
{
	public class CreateBindingModel
	{
		[Required]
		public decimal Weight { get; set; }

		[Required]
		public DateTime DateRecorded { get; set; }
	}
}