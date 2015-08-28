using Jonesware.WeightTracker.Core;
using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Services.Interfaces;
using System;
using System.Data.Entity;
using System.Linq;

namespace Jonesware.WeightTracker.Services
{
	public class UserService : IUserService
	{
		private WeightTrackerEntities db;

		public UserService(DbContext context)
		{
			if (context == null)
				throw new ArgumentNullException("context");
			db = context as WeightTrackerEntities;
		}

		public User CreateUser(string username, string password, string email)
		{
			var user = new User()
			{
				Username = username,
				Password = Security.HashPassword(password),
				Email = email,
				IsActive = true
			};

			db.Users.Add(user);
			db.SaveChanges();

			return user;
		}

		public User GetActiveUser(string username, string password)
		{
			var user = db.Users.Where(u => u.Username == username && u.IsActive).FirstOrDefault();
			if (user == null)
				throw new Exception("Invalid username/password given");

			if (!Security.ValidatePassword(password, user.Password))
				throw new Exception("Invalid username/password given");

			return user;
		}
    }
}