using Jonesware.WeightTracker.Website.Models;
using System;
using System.Security.Claims;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.Website.Views
{
	public class BaseViewPage<TModel> : WebViewPage<TModel>
	{
		private CustomPrincipal _user;

		protected virtual new CustomPrincipal User
		{
			get
			{
				if (_user == null)
				{
					_user = new CustomPrincipal(ClaimsPrincipal.Current);
				}

				return _user;
			}
		}

		public override void Execute()
		{
			throw new NotImplementedException();
		}
	}

	public class BaseViewPage : WebViewPage
	{
		private CustomPrincipal _user;

		protected virtual new CustomPrincipal User
		{
			get
			{
				if (_user == null)
				{
					_user = new CustomPrincipal(ClaimsPrincipal.Current);
				}

				return _user;
			}
		}

		public override void Execute()
		{
			throw new NotImplementedException();
		}
	}
}