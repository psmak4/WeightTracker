using System.Configuration;

namespace Jonesware.WeightTracker.Website
{
	public static class Constants
	{
		public static string SiteName
		{
			get
			{
				return ConfigurationManager.AppSettings["SiteName"].ToString();
			}
		}
	}
}