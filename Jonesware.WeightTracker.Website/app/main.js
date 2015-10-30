requirejs.config({
	paths: {
		'adminLTE': '/js/lib/adminLTE/adminLTE',
		'bootstrap': ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min', '/js/lib/bootstrap/bootstrap'],
		'datatables.bootstrap': ['https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.9/js/dataTables.bootstrap.min'],
		'datatables.jquery': ['https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.9/js/jquery.dataTables.min'],
		'datepicker': ['https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/js/bootstrap-datepicker.min', '/js/lib/datepicker/datepicker'],
		'durandal': '/js/lib/durandal',
		'flot': ['https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min', '/js/lib/flot/jquery.flot'],
		'flot.resize': ['https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.resize.min', '/js/lib/flot/jquery.flot.resize'],
		'flot.selection': ['https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.selection.min', '/js/lib/flot/jquery.flot.selection'],
		'flot.time': ['https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.time.min', '/js/lib/flot/jquery.flot.time'],
		'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min', '/js/lib/jquery/jquery'],
		'jquery.utilities': '/js/lib/jquery.utilities/jquery.utilities',
		'knockout': ['https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min', '/js/lib/knockout/knockout'],
		'knockout.validation': ['https://cdnjs.cloudflare.com/ajax/libs/knockout-validation/2.0.3/knockout.validation.min', '/js/lib/knockout/knockout.validation'],
		'logger': '/app/services/logger',
		'plugins': '/js/lib/durandal/plugins',
		'security': '/app/services/security',
		'session': '/app/global/session',
		'settings': '/app/settings',
		'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min', '/js/lib/text/text'],
		'toastr': ['https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.2/toastr.min', '/js/lib/toastr/toastr'],
		'transitions': '/js/lib/durandal/transitions',
		'userService': '/app/services/userService',
		'utilities': '/app/services/utilities'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
		'adminLTE': ['bootstrap'],
		'bootstrap': ['jquery'],
		'datatables.bootstrap': ['bootstrap', 'datatables.jquery'],
		'datatables.jquery': ['jquery'],
		'datepicker': ['bootstrap'],
		'flot': ['jquery'],
		'flot.resize': ['flot'],
		'flot.selection': ['flot'],
		'flot.time': ['flot'],
		'jquery.utilities': ['jquery'],
		'knockout.validation': ['knockout']
	}
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/composition', 'session', 'knockout', 'knockout.validation'], function (system, app, viewLocator, composition, session, ko) {
	system.debug(true);

	app.title = 'Weight Tracker';

	app.configurePlugins({
		router: true,
		dialog: true,
		widget: true
	});

	composition.addBindingHandler('hasFocus');

	configureKnockout();

	app.start().then(function () {
		viewLocator.useConvention();
		app.setRoot('viewmodels/layout');
	});

	function configureKnockout() {
		ko.validation.init({
			registerExtenders: true,
			messagesOnModified: true,
			insertMessages: true,
			parseInputAttributes: true,
			messageTemplate: null,
			decorateInputElement: true,
			errorElementClass: 'has-error',
			errorMessageClass: 'help-block'
		});

		if (!ko.utils.cloneNodes) {
			ko.utils.cloneNodes = function (nodesArray, shouldCleanNodes) {
				for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
					var clonedNode = nodesArray[i].cloneNode(true);
					newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
				}
				return newNodesArray;
			};
		}

		ko.bindingHandlers.ifIsInRole = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				ko.utils.domData.set(element, '__ko_withIfBindingData', {});
				return { 'controlsDescendantBindings': true };
			},
			update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var withIfData = ko.utils.domData.get(element, '__ko_withIfBindingData'),
                    dataValue = ko.utils.unwrapObservable(valueAccessor()),
                    shouldDisplay = session.userIsInRole(dataValue),
                    isFirstRender = !withIfData.savedNodes,
                    needsRefresh = isFirstRender || (shouldDisplay !== withIfData.didDisplayOnLastUpdate),
                    makeContextCallback = false;

				if (needsRefresh) {
					if (isFirstRender) {
						withIfData.savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
					}

					if (shouldDisplay) {
						if (!isFirstRender) {
							ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(withIfData.savedNodes));
						}
						ko.applyBindingsToDescendants(makeContextCallback ? makeContextCallback(bindingContext, dataValue) : bindingContext, element);
					} else {
						ko.virtualElements.emptyNode(element);
					}

					withIfData.didDisplayOnLastUpdate = shouldDisplay;
				}
			}
		};

		var validationCoreInit = ko.bindingHandlers['validationCore'].init;
		ko.bindingHandlers.validationCore = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				validationCoreInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
				var config = ko.validation.utils.getConfigOptions(element);
				if (config.decorateInputElement && ko.validation.utils.isValidatable(valueAccessor())) {
					var parent = $(element).parents(".form-group");
					if (parent.length) {
						ko.applyBindingsToNode(parent[0], { validationElement: valueAccessor() });
					}
				}
			}
		};
	}
});
