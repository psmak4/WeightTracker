using Jonesware.WeightTracker.Data.Contexts;
using Jonesware.WeightTracker.Model;
using Jonesware.WeightTracker.Services;
using Jonesware.WeightTracker.Services.Interfaces;
using Jonesware.WeightTracker.Website.ApiModels.WeighIns;
using Jonesware.WeightTracker.Website.BindingModels.WeighIns;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Jonesware.WeightTracker.Website.Controllers
{
	[RoutePrefix("api/weighins")]
	public class WeighInsController : BaseApiController
	{
		private IWeighInService weighInService;

		public WeighInsController()
		{
			this.weighInService = new WeighInService(new WeightTrackerEntities());
		}

		public WeighInsController(IWeighInService weighInService)
		{
			if (weighInService == null)
				throw new ArgumentNullException("weighInService");
			this.weighInService = weighInService;
		}

		[HttpGet]
		[Authorize]
		[Route("getweighin/{id:int}", Name = "GetWeighInById")]
		public IHttpActionResult GetWeighIn(int id)
		{
			var weighIn = weighInService.GetWeighIn(id);
			var model = CreateWeighInApiModel(weighIn);

			return Ok(model);
		}

		[HttpGet]
		[Authorize]
		[Route("getweighins")]
		public IHttpActionResult GetWeighIns()
		{
			var weighIns = weighInService.GetUserWeighIns(User.Identity.GetUserId());
			var model = CreateWeighInApiModels(weighIns);

			return Ok(model);
		}

		[HttpPost]
		[Authorize]
		[Route("createweighin")]
		public IHttpActionResult CreateWeighIn(CreateBindingModel model)
		{
			if (ModelState.IsValid)
			{
				try
				{
					var weighIn = weighInService.CreateWeighIn(User.Identity.GetUserId(), model.Weight.Value, model.DateRecorded.Value);

					Uri locationHeader = new Uri(Url.Link("GetWeighInById", new { id = weighIn.Id }));

					return Created(locationHeader, CreateWeighInApiModel(weighIn));
				}
				catch (Exception ex)
				{
					ModelState.AddModelError("", ex);
				}
			}

			return BadRequest(ModelState);
		}

		// DELETE: api/WeighIns/5
		public void Delete(int id)
		{
		}

		[HttpGet]
		[Authorize]
		[Route("getstats")]
		public async Task<IHttpActionResult> GetStats()
		{
			var user = await AppUserManager.FindByIdAsync(User.Identity.GetUserId());
			if (user != null)
			{
				var weights = weighInService.GetUserWeighIns(user.Id);
				decimal? weight = weights.Any() ? weights.OrderByDescending(w => w.DateRecorded).First().Weight : new decimal?();
				return Ok(new StatsApiModel(weight, user.Height, GetAge(user.DateOfBirth), user.Gender));
			}

			return NotFound();
		}

		private WeighInApiModel CreateWeighInApiModel(WeighIn weighIn)
		{
			var model = new WeighInApiModel()
			{
				Id = weighIn.Id,
				UserId = weighIn.UserId,
				Weight = weighIn.Weight,
				DateRecorded = weighIn.DateRecorded.ToUniversalTime()
			};

			return model;
		}

		private IEnumerable<WeighInApiModel> CreateWeighInApiModels(IEnumerable<WeighIn> weighIns)
		{
			var model = new List<WeighInApiModel>();
			foreach (var weighIn in weighIns)
			{
				model.Add(CreateWeighInApiModel(weighIn));
			}

			return model;
		}

		private int? GetAge(DateTime dateOfBirth)
		{
			DateTime today = DateTime.Today;
			int age = today.Year - dateOfBirth.Year;
			if (dateOfBirth > today.AddYears(-age))
				age--;

			return new int?(age);
		}
	}
}