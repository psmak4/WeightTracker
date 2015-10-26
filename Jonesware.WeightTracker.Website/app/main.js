requirejs.config({
	paths: {
		'bootstrap': '/js/lib/bootstrap/bootstrap',
		'datepicker': '/js/lib/datepicker/datepicker',
		'durandal': '/js/lib/durandal',
		'flot': '/js/lib/flot/jquery.flot',
		'flot.resize': '/js/lib/flot/jquery.flot.resize',
		'flot.selection': '/js/lib/flot/jquery.flot.selection',
		'flot.time': '/js/lib/flot/jquery.flot.time',
		'jquery': '/js/lib/jquery/jquery',
		'jquery.utilities': '/js/lib/jquery.utilities/jquery.utilities',
		'knockout': '/js/lib/knockout/knockout',
		'knockout.projections': '/js/lib/knockout/knockout.projections',
		'knockout.validation': '/js/lib/knockout/knockout.validation',
		'logger': '/app/services/logger',
		'plugins': '/js/lib/durandal/plugins',
		'security': '/app/services/security',
		'semantic': '/js/lib/semantic/semantic',
		'session': '/app/global/session',
		'settings': '/app/settings',
		'text': '/js/lib/text/text',
		'toastr': '/js/lib/toastr/toastr',
		'transitions': '/js/lib/durandal/transitions',
		'userService': '/app/services/userService',
		'utilities': '/app/services/utilities'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
		'bootstrap': ['jquery'],
		'datepicker': ['bootstrap'],
		'flot': ['jquery'],
		'flot.resize': ['flot'],
		'flot.selection': ['flot'],
		'flot.time': ['flot'],
		'jquery.utilities': ['jquery'],
		'knockout.projections': ['knockout'],
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
