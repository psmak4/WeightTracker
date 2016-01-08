using System.Configuration;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Helpers
{
	public static class HtmlHelpers
	{
		public static string GetSmallProfileImageUrl(this HtmlHelper html, string email)
		{
			var imageUrl = ConfigurationManager.AppSettings["SmallProfileImageUrl"];
			return string.Format(imageUrl, email.GetMd5Hash());
		}

		public static string GetLargeProfileImageUrl(this HtmlHelper html, string email)
		{
			var imageUrl = ConfigurationManager.AppSettings["LargeProfileImageUrl"];
			return string.Format(imageUrl, email.GetMd5Hash());
		}
	}
}