using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Models
{
	public sealed class SiteTheme
	{
		private readonly string name;
		private readonly string value;
		private static readonly Dictionary<string, SiteTheme> instance = new Dictionary<string, SiteTheme>();

		public static readonly SiteTheme Black = new SiteTheme("black", "Black");
		public static readonly SiteTheme Blue = new SiteTheme("blue", "blue");

		private SiteTheme(string value, String name)
		{
			this.name = name;
			this.value = value;
			instance[name] = this;
		}

		public override String ToString()
		{
			return name;
		}

		public static explicit operator SiteTheme(string str)
		{
			SiteTheme result;
			if (instance.TryGetValue(str, out result))
				return result;
			else
				throw new InvalidCastException();
		}

		public static IEnumerable<SelectListItem> ToSelectListItems()
		{
			var themes = new List<SelectListItem>();
			themes.Add(new SelectListItem()
			{
				Text = Black.name,
				Value = Black.value
			});
			themes.Add(new SelectListItem()
			{
				Text = Blue.name,
				Value = Blue.value
			});

			return themes.AsEnumerable();
		}
	}
}