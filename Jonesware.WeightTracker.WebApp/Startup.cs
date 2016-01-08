using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Jonesware.WeightTracker.WebApp.Startup))]
namespace Jonesware.WeightTracker.WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
