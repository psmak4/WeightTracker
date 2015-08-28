using Autofac;
using Autofac.Integration.Mvc;
using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using System.Data.Entity;
using System.Reflection;

namespace Jonesware.WeightTracker.Website
{
	public class AutofacConfig
	{
		public static IContainer Register()
		{
			var builder = new ContainerBuilder();

			// Register interfaces
			builder.RegisterType<WeightTrackerEntities>().As<DbContext>();
			builder.RegisterType<UserService>().As<IUserService>();
			builder.RegisterType<WeighInService>().As<IWeighInService>();

			// Register your MVC controllers.
			builder.RegisterControllers(typeof(MvcApplication).Assembly);

			// Register model binders that require DI.
			builder.RegisterModelBinderProvider();
			builder.RegisterModelBinders(Assembly.GetExecutingAssembly());

			// Register web abstractions like HttpContextBase.
			builder.RegisterModule<AutofacWebTypesModule>();

			// Enable property injection in view pages.
			builder.RegisterSource(new ViewRegistrationSource());

			// Enable property injection into action filters.
			builder.RegisterFilterProvider();

			// Set the dependency resolver to be Autofac.
			var container = builder.Build();

			return container;
		}
	}
}