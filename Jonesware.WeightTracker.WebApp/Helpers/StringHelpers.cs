using System.Security.Cryptography;
using System.Text;

namespace Jonesware.WeightTracker.WebApp.Helpers
{
	public static class StringHelpers
	{
		public static string GetMd5Hash(this string input)
		{
			var md5 = MD5.Create();
			var data = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
			var sBuilder = new StringBuilder();
			for (int i = 0; i < data.Length; i++)
			{
				sBuilder.Append(data[i].ToString("x2"));
			}

			return sBuilder.ToString();
		}
	}
}