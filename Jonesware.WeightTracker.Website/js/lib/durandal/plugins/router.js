define(["durandal/system","durandal/app","durandal/activator","durandal/events","durandal/composition","plugins/history","knockout","jquery"],function(e,t,r,n,i,o,a,u){function c(e){return e=e.replace(b,"\\$&").replace(p,"(?:$1)?").replace(h,function(e,t){return t?e:"([^/]+)"}).replace(m,"(.*?)"),new RegExp("^"+e+"$",R?void 0:"i")}function l(e){var t=e.indexOf(":"),r=t>0?t-1:e.length;return e.substring(0,r)}function s(e,t){return-1!==e.indexOf(t,e.length-t.length)}function g(e,t){if(!e||!t)return!1;if(e.length!=t.length)return!1;for(var r=0,n=e.length;n>r;r++)if(e[r]!=t[r])return!1;return!0}function f(e){return e.queryString?e.fragment+"?"+e.queryString:e.fragment}var v,d,p=/\((.*?)\)/g,h=/(\(\?)?:\w+/g,m=/\*\w+/g,b=/[\-{}\[\]+?.,\\\^$|#\s]/g,I=/\/$/,R=!1,y="/",w="/",P=function(){function i(e,t){return e.router&&e.router.parent==t}function u(e){B&&B.config.isActive&&B.config.isActive(e)}function p(t,r,n){e.log("Navigation Complete",t,r);var o=e.getModuleId(_);o&&F.trigger("router:navigation:from:"+o),_=t,u(!1),B=r,u(!0);var a=e.getModuleId(_);switch(a&&F.trigger("router:navigation:to:"+a),i(t,F)||F.updateDocumentTitle(t,r),n){case"rootRouter":y=f(B);break;case"rootRouterWithChild":w=f(B);break;case"lastChildRouter":y=w}d.explicitNavigation=!1,d.navigatingBack=!1,F.trigger("router:navigation:complete",t,r,F)}function m(t,r){e.log("Navigation Cancelled"),F.activeInstruction(B),F.navigate(y,!1),O(!1),d.explicitNavigation=!1,d.navigatingBack=!1,F.trigger("router:navigation:cancelled",t,r,F)}function b(t){e.log("Navigation Redirecting"),O(!1),d.explicitNavigation=!1,d.navigatingBack=!1,F.navigate(t,{trigger:!0,replace:!0})}function R(t,r,n){d.navigatingBack=!d.explicitNavigation&&_!=n.fragment,F.trigger("router:route:activating",r,n,F);var o={canDeactivate:!F.parent};t.activateItem(r,n.params,o).then(function(e){if(e){var o=_,a=i(r,F),u="";if(F.parent?a||(u="lastChildRouter"):u=a?"rootRouterWithChild":"rootRouter",p(r,n,u),a){r.router.trigger("router:route:before-child-routes",r,n,F);var c=n.fragment;n.queryString&&(c+="?"+n.queryString),r.router.loadUrl(c)}o==r&&(F.attached(),F.compositionComplete())}else t.settings.lifecycleData&&t.settings.lifecycleData.redirect?b(t.settings.lifecycleData.redirect):m(r,n);v&&(v.resolve(),v=null)}).fail(function(t){e.error(t)})}function S(t,r,n){var i=F.guardRoute(r,n);i||""===i?i.then?i.then(function(i){i?e.isString(i)?b(i):R(t,r,n):m(r,n)}):e.isString(i)?b(i):R(t,r,n):m(r,n)}function C(e,t,r){F.guardRoute?S(e,t,r):R(e,t,r)}function x(e){return B&&B.config.moduleId==e.config.moduleId&&_&&(_.canReuseForRoute&&_.canReuseForRoute.apply(_,e.params)||!_.canReuseForRoute&&_.router&&_.router.loadUrl)}function k(){if(!O()){var t=H.shift();if(H=[],t)if(O(!0),F.activeInstruction(t),F.trigger("router:navigation:processing",t,F),x(t)){var n=r.create();n.forceActiveItem(_),n.settings.areSameItem=D.settings.areSameItem,n.settings.findChildActivator=D.settings.findChildActivator,C(n,_,t)}else t.config.moduleId?e.acquire(t.config.moduleId).then(function(r){var n=e.resolveObject(r);t.config.viewUrl&&(n.viewUrl=t.config.viewUrl),C(D,n,t)}).fail(function(r){e.error("Failed to load routed module ("+t.config.moduleId+"). Details: "+r.message,r)}):C(D,{viewUrl:t.config.viewUrl,canReuseForRoute:function(){return!0}},t)}}function N(e){H.unshift(e),k()}function A(e,t,r){for(var n=e.exec(t).slice(1),i=0;i<n.length;i++){var o=n[i];n[i]=o?decodeURIComponent(o):null}var a=F.parseQueryString(r);return a&&n.push(a),{params:n,queryParams:a}}function T(t){F.trigger("router:route:before-config",t,F),e.isRegExp(t.route)?t.routePattern=t.route:(t.title=t.title||F.convertRouteToTitle(t.route),t.viewUrl||(t.moduleId=t.moduleId||F.convertRouteToModuleId(t.route)),t.hash=t.hash||F.convertRouteToHash(t.route),t.hasChildRoutes&&(t.route=t.route+"*childRoutes"),t.routePattern=c(t.route)),t.isActive=t.isActive||a.observable(!1),F.trigger("router:route:after-config",t,F),F.routes.push(t),F.route(t.routePattern,function(e,r){var n=A(t.routePattern,e,r);N({fragment:e,queryString:r,config:t,params:n.params,queryParams:n.queryParams})})}function U(t){if(e.isArray(t.route))for(var r=t.isActive||a.observable(!1),n=0,i=t.route.length;i>n;n++){var o=e.extend({},t);o.route=t.route[n],o.isActive=r,n>0&&delete o.nav,T(o)}else T(t);return F}function q(e){var r=a.unwrap(t.title);r?document.title=e+" | "+r:document.title=e}var _,B,H=[],O=a.observable(!1),D=r.create(),F={handlers:[],routes:[],navigationModel:a.observableArray([]),activeItem:D,isNavigating:a.computed(function(){var e=D(),t=O(),r=e&&e.router&&e.router!=F&&e.router.isNavigating()?!0:!1;return t||r}),activeInstruction:a.observable(null),__router__:!0};n.includeIn(F),D.settings.areSameItem=function(e,t,r,n){return e==t?g(r,n):!1},D.settings.findChildActivator=function(e){return e&&e.router&&e.router.parent==F?e.router.activeItem:null},F.parseQueryString=function(t){var r,n;if(!t)return null;if(n=t.split("&"),0==n.length)return null;r={};for(var i=0;i<n.length;i++){var o=n[i];if(""!==o){var a=o.split(/=(.+)?/),u=a[0],c=a[1]&&decodeURIComponent(a[1].replace(/\+/g," ")),l=r[u];l?e.isArray(l)?l.push(c):r[u]=[l,c]:r[u]=c}}return r},F.route=function(e,t){F.handlers.push({routePattern:e,callback:t})},F.loadUrl=function(t){var r=F.handlers,n=null,i=t,a=t.indexOf("?");if(-1!=a&&(i=t.substring(0,a),n=t.substr(a+1)),F.relativeToParentRouter){var u=this.parent.activeInstruction();i=-1==a?u.params.join("/"):u.params.slice(0,-1).join("/"),i&&"/"==i.charAt(0)&&(i=i.substr(1)),i||(i=""),i=i.replace("//","/").replace("//","/")}i=i.replace(I,"");for(var c=0;c<r.length;c++){var l=r[c];if(l.routePattern.test(i))return l.callback(i,n),!0}return e.log("Route Not Found",t,B),F.trigger("router:route:not-found",t,F),F.parent&&(y=w),o.navigate(y,{trigger:!1,replace:!0}),d.explicitNavigation=!1,d.navigatingBack=!1,!1};var M;return a.isObservable(t.title)&&t.title.subscribe(function(){var e=F.activeInstruction(),t=null!=e?a.unwrap(e.config.title):"";q(t)}),F.updateDocumentTitle=function(e,r){var n=a.unwrap(t.title),i=r.config.title;M&&M.dispose(),i?a.isObservable(i)?(M=i.subscribe(q),q(i())):q(i):n&&(document.title=n)},F.navigate=function(t,r){return t&&-1!=t.indexOf("://")?(window.location.href=t,!0):((void 0===r||e.isBoolean(r)&&r||e.isObject(r)&&r.trigger)&&(d.explicitNavigation=!0),(e.isBoolean(r)&&!r||r&&void 0!=r.trigger&&!r.trigger)&&(y=t),o.navigate(t,r))},F.navigateBack=function(){o.navigateBack()},F.attached=function(){F.trigger("router:navigation:attached",_,B,F)},F.compositionComplete=function(){O(!1),F.trigger("router:navigation:composition-complete",_,B,F),k()},F.convertRouteToHash=function(e){if(e=e.replace(/\*.*$/,""),F.relativeToParentRouter){var t=F.parent.activeInstruction(),r=e?t.config.hash+"/"+e:t.config.hash;return o._hasPushState&&(r="/"+r),r=r.replace("//","/").replace("//","/")}return o._hasPushState?e:"#"+e},F.convertRouteToModuleId=function(e){return l(e)},F.convertRouteToTitle=function(e){var t=l(e);return t.substring(0,1).toUpperCase()+t.substring(1)},F.map=function(t,r){if(e.isArray(t)){for(var n=0;n<t.length;n++)F.map(t[n]);return F}return e.isString(t)||e.isRegExp(t)?(r?e.isString(r)&&(r={moduleId:r}):r={},r.route=t):r=t,U(r)},F.buildNavigationModel=function(t){for(var r=[],n=F.routes,i=t||100,o=0;o<n.length;o++){var a=n[o];a.nav&&(e.isNumber(a.nav)||(a.nav=++i),r.push(a))}return r.sort(function(e,t){return e.nav-t.nav}),F.navigationModel(r),F},F.mapUnknownRoutes=function(t,r){var n="*catchall",i=c(n);return F.route(i,function(a,u){var c=A(i,a,u),l={fragment:a,queryString:u,config:{route:n,routePattern:i},params:c.params,queryParams:c.queryParams};if(t)if(e.isString(t))l.config.moduleId=t,r&&o.navigate(r,{trigger:!1,replace:!0});else if(e.isFunction(t)){var s=t(l);if(s&&s.then)return void s.then(function(){F.trigger("router:route:before-config",l.config,F),F.trigger("router:route:after-config",l.config,F),N(l)})}else l.config=t,l.config.route=n,l.config.routePattern=i;else l.config.moduleId=a;F.trigger("router:route:before-config",l.config,F),F.trigger("router:route:after-config",l.config,F),N(l)}),F},F.reset=function(){return B=_=void 0,F.handlers=[],F.routes=[],F.off(),delete F.options,F},F.makeRelative=function(t){return e.isString(t)&&(t={moduleId:t,route:t}),t.moduleId&&!s(t.moduleId,"/")&&(t.moduleId+="/"),t.route&&!s(t.route,"/")&&(t.route+="/"),t.fromParent&&(F.relativeToParentRouter=!0),F.on("router:route:before-config").then(function(e){t.moduleId&&(e.moduleId=t.moduleId+e.moduleId),t.route&&(""===e.route?e.route=t.route.substring(0,t.route.length-1):e.route=t.route+e.route)}),t.dynamicHash&&(F.on("router:route:after-config").then(function(e){e.routePattern=c(e.route?t.dynamicHash+"/"+e.route:t.dynamicHash),e.dynamicHash=e.dynamicHash||a.observable(e.hash)}),F.on("router:route:before-child-routes").then(function(e,t,r){for(var n=e.router,i=0;i<n.routes.length;i++){var o=n.routes[i],a=t.params.slice(0);o.hash=n.convertRouteToHash(o.route).replace(h,function(e){return a.length>0?a.shift():e}),o.dynamicHash(o.hash)}})),F},F.createChildRouter=function(){var e=P();return e.parent=F,e},F};return d=P(),d.explicitNavigation=!1,d.navigatingBack=!1,d.makeRoutesCaseSensitive=function(){R=!0},d.targetIsThisWindow=function(e){var t=u(e.target).attr("target");return!t||t===window.name||"_self"===t||"top"===t&&window===window.top?!0:!1},d.activate=function(t){return e.defer(function(r){if(v=r,d.options=e.extend({routeHandler:d.loadUrl},d.options,t),o.activate(d.options),o._hasPushState)for(var n=d.routes,i=n.length;i--;){var a=n[i];a.hash=a.hash.replace("#","/")}var c=d.options.root&&new RegExp("^"+d.options.root+"/");u(document).delegate("a","click",function(e){if(o._hasPushState){if(!e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&d.targetIsThisWindow(e)){var t=u(this).attr("href");null==t||"#"===t.charAt(0)||/^[a-z]+:/i.test(t)||(d.explicitNavigation=!0,e.preventDefault(),c&&(t=t.replace(c,"")),o.navigate(t))}}else d.explicitNavigation=!0}),o.options.silent&&v&&(v.resolve(),v=null)}).promise()},d.deactivate=function(){o.deactivate()},d.install=function(){a.bindingHandlers.router={init:function(){return{controlsDescendantBindings:!0}},update:function(e,t,r,n,o){var u=a.utils.unwrapObservable(t())||{};if(u.__router__)u={model:u.activeItem(),attached:u.attached,compositionComplete:u.compositionComplete,activate:!1};else{var c=a.utils.unwrapObservable(u.router||n.router)||d;u.model=c.activeItem(),u.attached=c.attached,u.compositionComplete=c.compositionComplete,u.activate=!1}i.compose(e,u,o)}},a.virtualElements.allowedBindings.router=!0},d});