using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jonesware.WeightTracker.Services
{
	public class WeighInService : IWeighInService
	{
		private WeightTrackerEntities db;

		public WeighInService(DbContext context)
		{
			if (context == null)
				throw new ArgumentNullException("context");
			db = context as WeightTrackerEntities;
		}

		public void CreateWeighIn(int userId, decimal weight, DateTime dateRecorded)
		{
			var weighIn = new WeighIn()
			{
				UserId = userId,
				Weight = weight,
				DateRecorded = dateRecorded
			};

			db.WeighIns.Add(weighIn);
			db.SaveChanges();
		}

		public void DeleteWeighIn(int weighInId, int userId)
		{
			var weighIn = db.WeighIns.Where(w => w.Id == weighInId && w.UserId == userId).FirstOrDefault();
			if (weighIn != null)
				db.WeighIns.Remove(weighIn);
		}

		public IEnumerable<WeighIn> GetUserWeighIns(int userId)
		{
			return db.WeighIns.Where(w => w.UserId == userId).AsEnumerable();
		}
    }
}
