using Jonesware.WeightTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JonesWare.WeightTracker.Services.Interfaces
{
	public interface IWeighInService
	{
		void CreateWeighIn(int userId, int weight, DateTime dateRecorded);

		void DeleteWeighIn(int weighInId, int userId);

		IEnumerable<WeighIn> GetUserWeighIns(int userId);
	}
}
