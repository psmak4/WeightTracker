using Microsoft.AspNet.Identity;
using SendGrid;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Jonesware.WeightTracker.Website.Identity
{
	public class SendGridEmailService : IIdentityMessageService
	{
		public async Task SendAsync(IdentityMessage message)
		{
			// Create the email object first, then add the properties.
			var myMessage = new SendGridMessage();

			// this defines email and name of the sender
			myMessage.From = new MailAddress("no-reply@weighttracker.net", "Weight Tracker");

			// set where we are sending the email
			myMessage.AddTo(message.Destination);

			myMessage.Subject = message.Subject;

			// make sure all your messages are formatted as HTML
			myMessage.Html = message.Body;

			// Create credentials, specifying your SendGrid username and password.
			var sendgridUsername = ConfigurationManager.AppSettings["SendgridUsername"];
			var sendgridPassword = ConfigurationManager.AppSettings["SendgridPassword"];
			var credentials = new NetworkCredential(sendgridUsername, sendgridPassword);

			// Create an Web transport for sending email.
			var transportWeb = new Web(credentials);

			// Send the email.
			await transportWeb.DeliverAsync(myMessage);
		}
	}
}