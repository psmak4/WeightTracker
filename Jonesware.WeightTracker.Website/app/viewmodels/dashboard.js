define(['jquery', 'knockout', 'session', 'utilities', 'logger', 'datepicker', 'flot', 'flot.resize', 'flot.time', 'datatables.bootstrap', 'datatables.jquery'], function ($, ko, session, utilities, logger) {
	var viewModel = function () {
		var self = this;
		var submit;
		var plot = undefined;

		self.weighIns = ko.observableArray();
		self.bodyFat = ko.observable();
		self.bmi = ko.observable();
		self.weight = ko.observable();
		self.canCalculate = ko.observable();
		self.bodyClass = ko.observable();

		self.newWeighInWeight = ko.observable().extend({ number: true, min: 0, max: 1000, step: 0.1 });
		self.newWeighInDate = ko.observable().extend({ date: true });

		self.errors = ko.observableArray([]);
		self.validationErrors = ko.validation.group([self.newWeighInWeight, self.newWeighInDate]);

		self.weighInsByDate = ko.dependentObservable(function () {
			return self.weighIns.slice().sort(function (a, b ) {
				return (Date.parse(a.dateRecorded) == Date.parse(b.dateRecorded) ? 0 : (Date.parse(a.dateRecorded) > Date.parse(b.dateRecorded) ? -1 : 1));
			});
		});
		self.weighInsByDateAsc = ko.dependentObservable(function () {
			return self.weighIns.slice().sort(function (a, b) {
				return (Date.parse(a.dateRecorded) == Date.parse(b.dateRecorded) ? 0 : (Date.parse(a.dateRecorded) > Date.parse(b.dateRecorded) ? 1 : -1));
			});
		});

		self.FormatLongDate = function (date) {
			var d_names = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
			var m_names = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
			var d = new Date(date);
			var curr_day = d.getDay();
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();

			return d_names[curr_day] + ', ' + m_names[curr_month] + ' ' + curr_date + ', ' + curr_year;
		}

		self.getWeighIns = function () {
			$.ajax({
				method: 'GET',
				url: session.baseUrl + '/api/weighins/getweighins',
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				self.weighIns(data);
				if (self.weighIns().length > 0) {
					processData(self.weighInsByDateAsc());
					self.getStats();
					$('#WeighInsTable').DataTable();
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				logger.log({
					message: jqXHR.responseJSON.error_description,
					data: jqXHR.responseJSON.error_description,
					showToast: true,
					type: 'error'
				});
			});
		};

		self.getStats = function () {
			$.ajax({
				method: "GET",
				url: session.baseUrl + '/api/weighins/getstats',
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				self.canCalculate(data.canCalculate);
				if (self.canCalculate()) {
					self.bodyFat(data.bodyFat.value.toFixed(2));
					self.bmi(data.bodyFat.bmi.value.toFixed(2));
					self.weight(data.weight);
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				logger.log({
					message: jqXHR.responseJSON.error_description,
					data: jqXHR.responseJSON.error_description,
					showToast: true,
					type: "error"
				});
			});
		};

		self.createWeighIn = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}

			submit.text('Loading...');
			submit.attr('disabled', true);

			$.ajax({
				method: 'POST',
				url: session.baseUrl + '/api/weighins/createweighin',
				data: {
					Weight: self.newWeighInWeight(),
					DateRecorded: self.newWeighInDate()
				},
				headers: {
					Authorization: 'Bearer ' + session.accessToken()
				}
			})
			.done(function (data) {
				self.weighIns.push(data);
				processData(self.weighInsByDateAsc());

				self.newWeighInWeight(null);
				self.newWeighInDate(null);
				self.newWeighInWeight.clearError();
				self.newWeighInDate.clearError();

				submit.attr('disabled', false);
				submit.text('Submit');

				logger.log({
					message: 'Weigh in added',
					data: '',
					showToast: true,
					type: 'success'
				});
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				utilities.HandleAjaxError(jqXHR, self.errors);
				submit.attr('disabled', false);
				submit.text('Submit');
			});
		}

		var processData = function (data) {
			if (data.length > 0) {
				var d = [];
				for (index = 0; index < data.length; index++) {
					var date = new Date(data[index].dateRecorded);
					date.setHours(date.getHours() - 6);
					d.push([date.getTime(), data[index].weight])
				}

				plot = $.plot('#placeholder',
					[{ data: d, label: 'Weight' }],
					{
						xaxis: {
							mode: 'time'
						},
						series: {
							lines: {
								show: true
							},
							points: {
								show: true
							}
						},
						selection: {
							mode: 'x'
						},
						grid: {
							markings: weekendAreas,
							hoverable: true,
							verticalLines: true,
							horizontalLines: true
						},
						colors: ['#E74C3C'],
					}
				);

				function weekendAreas(axes) {
					var markings = [];
					var d = new Date(axes.xaxis.min);

					d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
					d.setUTCSeconds(0);
					d.setUTCMinutes(0);
					d.setUTCHours(0);

					var i = d.getTime();
					do {
						markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
						i += 7 * 24 * 60 * 60 * 1000;
					} while (i < axes.xaxis.max);

					return markings;
				}

				$("<div id='tooltip'></div>").css({
					position: "absolute",
					display: "none",
					border: "1px solid #fdd",
					padding: "2px",
					"background-color": "#fee",
					opacity: 0.80
				}).appendTo("body");

				$('#placeholder').bind('plothover', function (event, pos, item) {
					if (item) {
						var x = item.datapoint[0],
							y = item.datapoint[1].toFixed(1);

						var date = new Date(x);
						date.setHours(date.getHours() + 6);

						$('#tooltip').html(date.toLocaleDateString() + ": " + y)
							.css({ top: item.pageY + 5, left: item.pageX + 5 })
							.fadeIn(200);
					} else {
						$('#tooltip').hide();
					}
				});
			}
		};

		self.activate = function () {
		};

		self.attached = function () {
			self.getWeighIns();

			self.newWeighInDate(new Date().toLocaleDateString());
			$('#Date').datepicker({
				autoclose: true,
				format: 'm/d/yyyy',
				orientation: 'top left'
			});

			submit = $('#Submit');

			self.bodyClass(session.user().gender === 'm' ? 'fa fw fa-male' : 'fa fw fa-female');
		}
	};

	return new viewModel();
});