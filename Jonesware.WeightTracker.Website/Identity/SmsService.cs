using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Threading.Tasks;
using Twilio;

namespace Jonesware.WeightTracker.Website.Identity
{
	public class SmsService : IIdentityMessageService
	{
		public Task SendAsync(IdentityMessage message)
		{
			var twilioSid = ConfigurationManager.AppSettings["TwilioSid"];
			var twilioToken = ConfigurationManager.AppSettings["TwilioToken"];
			var twilioFromPhone = ConfigurationManager.AppSettings["TwilioFromPhone"];
			var twilio = new TwilioRestClient(twilioSid, twilioToken);
			var result = twilio.SendMessage(twilioFromPhone, message.Destination, message.Body);

			return Task.FromResult(0);
		}
	}
}