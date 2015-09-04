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
			var user = GetUser(username);
			if (user != null)
				throw new Exception("Username is already taken");

			user = new User()
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
			var user = db.Users.FirstOrDefault(u => u.Username == username && u.IsActive);
			if (user == null)
				throw new Exception("Invalid username/password given");

			if (!Security.ValidatePassword(password, user.Password))
				throw new Exception("Invalid username/password given");

			return user;
		}

		public User GetUser(int userId)
		{
			return db.Users.FirstOrDefault(u => u.Id == userId);
		}

		public User GetUser(string username)
		{
			return db.Users.FirstOrDefault(u => u.Username.ToLower() == username.ToLower());
		}
	}
}