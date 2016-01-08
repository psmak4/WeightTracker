using Jonesware.WeightTracker.Model;
using System;
using System.Collections.Generic;

namespace Jonesware.WeightTracker.Services.Interfaces
{
	public interface IWeighInService
	{
		WeighIn CreateWeighIn(string userId, decimal weight, DateTime dateRecorded);

		void DeleteWeighIn(int weighInId, string userId);

		IEnumerable<WeighIn> GetUserWeighIns(string userId);

		WeighIn GetWeighIn(int weighInId);

		int GetTotalWeighIns();
	}
}