using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Jonesware.WeightTracker.Website.Identity
{
	public class MailtrapEmailService : IIdentityMessageService
	{
		public Task SendAsync(IdentityMessage message)
		{
			var mailtrapUsername = ConfigurationManager.AppSettings["MailtrapUsername"];
			var mailtrapPassword = ConfigurationManager.AppSettings["MailtrapPassword"];

			var client = new SmtpClient
			{
				Host = "mailtrap.io",
				Port = 2525,
				Credentials = new NetworkCredential(mailtrapUsername, mailtrapPassword),
				EnableSsl = true,
			};

			var from = new MailAddress("no-reply@mybabydaily.com", "My Baby Daily");
			var to = new MailAddress(message.Destination);

			var mail = new MailMessage(from, to)
			{
				Subject = message.Subject,
				Body = message.Body,
				IsBodyHtml = true
			};

			client.Send(mail);

			return Task.FromResult(0);
		}
	}
}