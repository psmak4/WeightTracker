using Jonesware.WeightTracker.Website.ApiModels.Accounts;
using Jonesware.WeightTracker.Website.BindingModels.Accounts;
using Jonesware.WeightTracker.Website.Identity;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Jonesware.WeightTracker.Website.Controllers
{
	[RoutePrefix("api/accounts")]
	public class AccountsController : BaseApiController
	{
		[Authorize(Roles = "Admin")]
		[Route("users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => CreateUserApiModel(u)));
		}

		[Authorize(Roles = "Admin")]
		[Route("user/{id:guid}", Name = "GetUserById")]
		public async Task<IHttpActionResult> GetUser(string Id)
		{
			var user = await this.AppUserManager.FindByIdAsync(Id);
			if (user != null)
				return Ok(CreateUserApiModel(user));

			return NotFound();
		}

		[HttpGet]
		[Authorize]
		[Route("user/me", Name = "GetMe")]
		public async Task<IHttpActionResult> GetMe()
		{
			var user = await this.AppUserManager.FindByIdAsync(User.Identity.GetUserId());
			if (user != null)
				return Ok(CreateUserApiModel(user));

			return NotFound();
		}

		[Authorize(Roles = "Admin")]
		[Route("user/{username}")]
		public async Task<IHttpActionResult> GetUserByName(string username)
		{
			var user = await this.AppUserManager.FindByNameAsync(username);

			if (user != null)
			{
				return Ok(CreateUserApiModel(user));
			}

			return NotFound();
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("create")]
		public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var user = new ApplicationUser()
			{
				UserName = createUserModel.Username,
				Email = createUserModel.Email,
				FirstName = createUserModel.FirstName,
				LastName = createUserModel.LastName,
				DateOfBirth = createUserModel.DateOfBirth.Value,
				Height = createUserModel.Height.Value,
				Gender = createUserModel.Gender,
				DateCreated = DateTime.Now.Date,
				Theme = createUserModel.Theme
			};

			var addUserResult = await AppUserManager.CreateAsync(user, createUserModel.Password);

			if (!addUserResult.Succeeded)
				return GetErrorResult(addUserResult);

			AppUserManager.AddToRole(user.Id, "User");

			string code = await this.AppUserManager.GenerateEmailConfirmationTokenAsync(user.Id);
			var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));
			await this.AppUserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

			Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

			return Created(locationHeader, CreateUserApiModel(user));
		}

		[HttpPost]
		[Authorize]
		[Route("user/me", Name = "UpdateMe")]
		public async Task<IHttpActionResult> UpdateUser(UpdateUserBindingModel updateUserModel)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var userId = User.Identity.GetUserId();
			var user = await this.AppUserManager.FindByIdAsync(userId);
			if (user == null)
				return BadRequest("User not found");

			user.FirstName = updateUserModel.FirstName;
			user.LastName = updateUserModel.LastName;
			user.DateOfBirth = updateUserModel.DateOfBirth.Value;
			user.Height = updateUserModel.Height.Value;
			user.Gender = updateUserModel.Gender;
			user.Theme = updateUserModel.Theme;

			IdentityResult updateUserResult = await AppUserManager.UpdateAsync(user);

			if (!updateUserResult.Succeeded)
				return GetErrorResult(updateUserResult);

			return Ok(CreateUserApiModel(user));
		}

		[AllowAnonymous]
		[HttpGet]
		[Route("confirmemail", Name = "ConfirmEmailRoute")]
		public async Task<IHttpActionResult> ConfirmEmail(string userId = "", string code = "")
		{
			if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
			{
				ModelState.AddModelError("", "User Id and Code are required");
				return BadRequest(ModelState);
			}

			IdentityResult result = await this.AppUserManager.ConfirmEmailAsync(userId, code);

			if (result.Succeeded)
			{
				return Ok();
			}
			else
			{
				return GetErrorResult(result);
			}
		}

		[Authorize]
		[Route("changepassword")]
		public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

			if (!result.Succeeded)
				return GetErrorResult(result);

			return Ok();
		}

		[HttpPost]
		[Route("forgotpassword")]
		[AllowAnonymous]
		public async Task<IHttpActionResult> ForgotPassword(ForgotPasswordBindingModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (!model.CallbackUrl.StartsWith("/"))
				return BadRequest("Invalid callback url");

			var user = await AppUserManager.FindByEmailAsync(model.Email);
			if (user == null || !(await AppUserManager.IsEmailConfirmedAsync(user.Id)))
			{
				return Ok();
			}

			var code = await AppUserManager.GeneratePasswordResetTokenAsync(user.Id);
			var callbackUrl = string.Format("{0}?u={1}&c={2}", new Uri(Request.RequestUri, model.CallbackUrl), user.Id, code);
			await AppUserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");

			return Ok();
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("resetpassword")]
		public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var result = await AppUserManager.PasswordValidator.ValidateAsync(model.Password);
			if (!result.Succeeded)
			{
				AddErrors(result);
				return BadRequest(ModelState);
			}

			var user = await AppUserManager.FindByIdAsync(model.UserId);
			if (user == null)
				return Ok();

			result = await AppUserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
			if (!result.Succeeded)
			{
				AddErrors(result);
				return BadRequest(ModelState);
			}

			return Ok();
		}

		[Authorize(Roles = "Admin")]
		[Route("user/{id:guid}")]
		public async Task<IHttpActionResult> DeleteUser(string id)
		{
			var appUser = await this.AppUserManager.FindByIdAsync(id);
			if (appUser != null)
			{
				IdentityResult result = await this.AppUserManager.DeleteAsync(appUser);

				if (!result.Succeeded)
					return GetErrorResult(result);

				return Ok();
			}

			return NotFound();
		}

		private UserApiModel CreateUserApiModel(ApplicationUser user)
		{
			var model = new UserApiModel
			{
				Url = Url.Link("GetUserById", new { id = user.Id }),
				Id = user.Id,
				UserName = user.UserName,
				FullName = string.Format("{0} {1}", user.FirstName, user.LastName),
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				EmailHash = GetMd5Hash(user.Email),
				EmailConfirmed = user.EmailConfirmed,
				DateOfBirth = user.DateOfBirth.ToUniversalTime(),
				Height = user.Height,
				Gender = user.Gender,
				DateCreated = user.DateCreated,
				Theme = user.Theme,
				Roles = this.AppUserManager.GetRolesAsync(user.Id).Result,
				Claims = this.AppUserManager.GetClaimsAsync(user.Id).Result
			};

			return model;
		}

		private string GetMd5Hash(string input)
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