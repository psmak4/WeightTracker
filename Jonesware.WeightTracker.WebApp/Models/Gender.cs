using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Models
{
	public sealed class Gender
	{
		private readonly string name;
		private readonly string value;
		private static readonly Dictionary<string, Gender> instance = new Dictionary<string, Gender>();

		public static readonly Gender Male = new Gender("m", "Male");
		public static readonly Gender Female = new Gender("f", "Female");

		private Gender(string value, String name)
		{
			this.name = name;
			this.value = value;
			instance[value] = this;
		}

		public string Value()
		{
			return value;
		}

		public override String ToString()
		{
			return name;
		}

		public static explicit operator Gender(string str)
		{
			Gender result;
			if (instance.TryGetValue(str, out result))
				return result;
			else
				throw new InvalidCastException();
		}

		public static IEnumerable<SelectListItem> ToSelectListItems()
		{
			var genders = new List<SelectListItem>();
			genders.Add(new SelectListItem()
			{
				Text = Male.name,
				Value = Male.value
			});
			genders.Add(new SelectListItem()
			{
				Text = Female.name,
				Value = Female.value
			});

			return genders.AsEnumerable();
		}
	}
}