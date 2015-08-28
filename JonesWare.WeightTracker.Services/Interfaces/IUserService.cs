using Jonesware.WeightTracker.Model;

namespace Jonesware.WeightTracker.Services.Interfaces
{
	public interface IUserService
	{
		User CreateUser(string username, string password, string email);

		User GetActiveUser(string username, string password);
	}
}