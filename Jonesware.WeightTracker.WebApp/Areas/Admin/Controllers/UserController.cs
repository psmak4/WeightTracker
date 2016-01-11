﻿using Jonesware.WeightTracker.WebApp.Areas.Admin.ViewModels.User;
using Jonesware.WeightTracker.WebApp.Controllers;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Jonesware.WeightTracker.WebApp.Areas.Admin.Controllers
{
	public class UserController : BaseController
	{
		public UserController()
		{
		}

		public ActionResult Index()
		{
			var model = new IndexViewModel()
			{
				Users = UserManager.Users.OrderBy(u => u.FirstName).ThenBy(u => u.LastName).ThenBy(u => u.DateCreated).AsEnumerable()
			};

			return View(model);
		}

		public ActionResult Details(string id)
		{
			var user = UserManager.Users.FirstOrDefault(u => u.Id == id);
			if (user == null)
			{
				SetErrorMessage("Invalid user id.");
				return RedirectToAction("Index");
			}

			return View(user);
		}
	}
}