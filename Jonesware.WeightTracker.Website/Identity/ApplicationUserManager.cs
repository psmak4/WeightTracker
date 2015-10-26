using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;

namespace Jonesware.WeightTracker.Website.Identity
{
	public class ApplicationUserManager : UserManager<ApplicationUser>
	{
		public ApplicationUserManager(IUserStore<ApplicationUser> store)
			: base(store)
		{
		}

		public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
		{
			var appDbContext = context.Get<ApplicationDbContext>();
			var appUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(appDbContext));

			appUserManager.UserValidator = new UserValidator<ApplicationUser>(appUserManager)
			{
				AllowOnlyAlphanumericUserNames = true,
				RequireUniqueEmail = true
			};

			appUserManager.PasswordValidator = new PasswordValidator
			{
				RequiredLength = 6,
				RequireNonLetterOrDigit = true,
				RequireDigit = true,
				RequireLowercase = true,
				RequireUppercase = true,
			};

			appUserManager.EmailService = new SendGridEmailService();
			appUserManager.SmsService = new SmsService();

			var dataProtectionProvider = options.DataProtectionProvider;
			if (dataProtectionProvider != null)
			{
				appUserManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"))
				{
					TokenLifespan = TimeSpan.FromHours(6)
				};
			}

			return appUserManager;
		}
	}
}