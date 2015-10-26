using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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

		public WeighIn CreateWeighIn(string userId, decimal weight, DateTime dateRecorded)
		{
			var weighIn = new WeighIn()
			{
				UserId = userId,
				Weight = weight,
				DateRecorded = dateRecorded
			};

			db.WeighIns.Add(weighIn);
			db.SaveChanges();

			return weighIn;
		}

		public void DeleteWeighIn(int weighInId, string userId)
		{
			var weighIn = db.WeighIns.Where(w => w.Id == weighInId && w.UserId == userId).FirstOrDefault();
			if (weighIn != null)
				db.WeighIns.Remove(weighIn);
		}

		public IEnumerable<WeighIn> GetUserWeighIns(string userId)
		{
			return db.WeighIns.Where(w => w.UserId == userId).AsEnumerable();
		}

		public WeighIn GetWeighIn(int weighInId)
		{
			return db.WeighIns.FirstOrDefault(w => w.Id == weighInId);
		}
    }
}