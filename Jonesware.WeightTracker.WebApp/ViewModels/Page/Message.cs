namespace Jonesware.WeightTracker.WebApp.ViewModels.Page
{
	public class Message
	{
		public MessageType Type { get; set; }

		public string Text { get; set; }

		public string MessageClass
		{
			get
			{
				var messageClass = "default";

				switch (Type)
				{
					case MessageType.Error:
						messageClass = "alert-danger";
						break;
					case MessageType.Info:
						messageClass = "alert-info";
						break;
					case MessageType.Success:
						messageClass = "alert-success";
						break;
					case MessageType.Warning:
						messageClass = "alert-warning";
						break;
				}

				return messageClass;
			}
		}
	}

	public enum MessageType
	{
		Error,
		Info,
		Success,
		Warning
	}
}