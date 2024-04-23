/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/assets/admin/Request.js":
/*!*******************************************!*\
  !*** ./resources/assets/admin/Request.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(method, route) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var url = "".concat(window.fluent_forms_global_var.rest.url, "/").concat(route);
  var headers = {
    "X-WP-Nonce": window.fluent_forms_global_var.rest.nonce
  };
  if (["PUT", "PATCH", "DELETE"].indexOf(method.toUpperCase()) !== -1) {
    headers["X-HTTP-Method-Override"] = method;
    method = "POST";
  }
  data.query_timestamp = Date.now();
  return new Promise(function (resolve, reject) {
    window.jQuery.ajax({
      url: url,
      type: method,
      data: data,
      headers: headers
    }).then(function (response) {
      return resolve(response);
    }).fail(function (errors) {
      if (errors.responseJSON && errors.responseJSON.code == 'rest_cookie_invalid_nonce') {
        // Renew nonce from the server and retry the original request.
        window.FluentFormsGlobal.$get({
          action: "fluentform_renew_rest_nonce"
        }).then(function (response) {
          if (response.nonce) {
            window.fluent_forms_global_var.rest.nonce = response.nonce;
            method = method.toLowerCase();
            window.FluentFormsGlobal.$rest[method](route, data).then(function (response) {
              resolve(response);
            }).fail(function (errors) {
              return reject(errors.responseJSON);
            });
          }
        });
      } else {
        reject(errors.responseJSON);
      }
    });
  });
}

/***/ }),

/***/ "./resources/assets/admin/Rest.js":
/*!****************************************!*\
  !*** ./resources/assets/admin/Rest.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Route.js */ "./resources/assets/admin/Route.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  get: function get(route) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return window.FluentFormsGlobal.request('GET', route, data);
  },
  post: function post(route) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return window.FluentFormsGlobal.request('POST', route, data);
  },
  "delete": function _delete(route) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return window.FluentFormsGlobal.request('DELETE', route, data);
  },
  put: function put(route) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return window.FluentFormsGlobal.request('PUT', route, data);
  },
  patch: function patch(route) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return window.FluentFormsGlobal.request('PATCH', route, data);
  },
  route: function route(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return _Route_js__WEBPACK_IMPORTED_MODULE_0__["default"].get.apply(_Route_js__WEBPACK_IMPORTED_MODULE_0__["default"], [name].concat(args));
  }
});
jQuery(function ($) {
  (function () {
    $.ajaxSetup({
      success: function success(response, status, xhr) {
        var nonce = xhr.getResponseHeader('X-WP-Nonce');
        if (nonce) {
          window.fluent_forms_global_var.rest.nonce = nonce;
        }
      }
    });
  })();
});
setInterval(function () {
  FluentFormsGlobal.$rest.get('forms/ping');
}, 60000);

/***/ }),

/***/ "./resources/assets/admin/Route.js":
/*!*****************************************!*\
  !*** ./resources/assets/admin/Route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Route = /*#__PURE__*/function () {
  function Route() {
    _classCallCheck(this, Route);
    _defineProperty(this, "getForms", "forms");
    _defineProperty(this, "storeForms", this.getForms);
    _defineProperty(this, "getTemplates", this.getForms + "/templates");
    _defineProperty(this, "findForm", this.getForms + "/{param}");
    _defineProperty(this, "updateForm", this.findForm);
    _defineProperty(this, "deleteForm", this.findForm);
    _defineProperty(this, "duplicateForm", this.findForm + "/duplicate");
    _defineProperty(this, "convertForm", this.findForm + "/convert");
    _defineProperty(this, "getFormResources", this.findForm + "/resources");
    _defineProperty(this, "getFormPages", this.findForm + "/pages");
    _defineProperty(this, "getFormFields", this.findForm + "/fields");
    _defineProperty(this, "getFormShortcodes", this.findForm + "/shortcodes");
    _defineProperty(this, "findFormShortCodePage", this.findForm + "/findShortCodePage");
    _defineProperty(this, "getFormSettings", "settings/{param}");
    _defineProperty(this, "storeFormSettings", this.getFormSettings);
    _defineProperty(this, "deleteFormSettings", this.getFormSettings);
    _defineProperty(this, "getPresetSettings", this.getFormSettings + "/preset");
    _defineProperty(this, "savePresetSettings", this.getFormSettings + "/save-preset");
    _defineProperty(this, "getGeneralFormSettings", this.getFormSettings + "/general");
    _defineProperty(this, "storeGeneralFormSettings", this.getGeneralFormSettings);
    _defineProperty(this, "getFormSettingsCustomizer", this.getFormSettings + "/customizer");
    _defineProperty(this, "storeFormSettingsCustomizer", this.getFormSettingsCustomizer);
    _defineProperty(this, "storeEntryColumns", this.getFormSettings + '/entry-columns');
    _defineProperty(this, "getFormSettingsConversationalDesign", this.getFormSettings + '/conversational-design');
    _defineProperty(this, "storeFormSettingsConversationalDesign", this.getFormSettings + '/store-conversational-design');
    _defineProperty(this, "getSubmissions", "submissions");
    _defineProperty(this, "getSubmissionsResources", this.getSubmissions + '/resources');
    _defineProperty(this, "handleSubmissionsBulkActions", this.getSubmissions + '/bulk-actions');
    _defineProperty(this, "getAllSubmissions", this.getSubmissions + '/all');
    _defineProperty(this, "findSubmission", this.getSubmissions + '/{param}');
    // not implemented
    _defineProperty(this, "deleteSubmission", this.findSubmission);
    _defineProperty(this, "updateSubmissionStatus", this.findSubmission + '/status');
    _defineProperty(this, "toggleSubmissionIsFavorite", this.findSubmission + '/is-favorite');
    _defineProperty(this, "getSubmissionLogs", this.findSubmission + '/logs');
    _defineProperty(this, "deleteSubmissionLogs", this.findSubmission + '/logs');
    _defineProperty(this, "getSubmissionNotes", this.findSubmission + '/notes');
    _defineProperty(this, "storeSubmissionNote", this.findSubmission + '/notes');
    _defineProperty(this, "getSubmissionUsers", this.findSubmission + '/submission-users');
    _defineProperty(this, "updateSubmissionUser", this.findSubmission + '/update-submission-user');
    _defineProperty(this, "getLogs", 'logs');
    _defineProperty(this, "getLogFilters", this.getLogs + '/filters');
    _defineProperty(this, "deleteLogs", this.getLogs);
    _defineProperty(this, "integrations", 'integrations');
    _defineProperty(this, "getGlobalIntegration", this.integrations);
    _defineProperty(this, "updateGlobalIntegration", this.integrations);
    _defineProperty(this, "updateGlobalIntegrationStatus", this.integrations + '/update-status');
    _defineProperty(this, "findIntegration", this.integrations + "/{param}");
    _defineProperty(this, "getFormIntegrationSettings", this.findIntegration);
    _defineProperty(this, "updateFormIntegrationSettings", this.findIntegration);
    _defineProperty(this, "deleteFormIntegration", this.findIntegration);
    _defineProperty(this, "getIntegrations", this.findIntegration + "/form-integrations");
    _defineProperty(this, "getFormIntegrationList", this.findIntegration + '/integration-list-id');
    _defineProperty(this, "getGlobalSettings", 'global-settings');
    _defineProperty(this, "storeGlobalSettings", this.getGlobalSettings);
    _defineProperty(this, "getRoles", 'roles');
    _defineProperty(this, "storeRoles", this.getRoles);
    _defineProperty(this, "getManagers", 'managers');
    _defineProperty(this, "storeManager", this.getManagers);
    _defineProperty(this, "deleteManager", this.storeManager);
    _defineProperty(this, "analytics", 'analytics');
    _defineProperty(this, "getFormAnalytics", this.analytics + '/{param}');
    _defineProperty(this, "resetFormAnalytics", this.analytics + '/{param}/reset/');
    _defineProperty(this, "report", 'report');
    _defineProperty(this, "formsReport", this.report + '/forms');
    _defineProperty(this, "formReport", this.formsReport + '/{param}');
    _defineProperty(this, "submissionsReport", this.report + '/submissions');
    //pro routes
    _defineProperty(this, "inventory", 'inventory');
    _defineProperty(this, "getInventoryList", this.inventory);
    _defineProperty(this, "storeInventory", this.inventory);
    _defineProperty(this, "noticeAction", 'notice');
    _defineProperty(this, "globalSearch", 'global-search');
  }
  _createClass(Route, [{
    key: "get",
    value: function get(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var route = this[name];
      if (!route) {
        throw "".concat(name, ":Route Not Found");
      }
      var continuation = 0;
      return route.replace(/{param}/g, function () {
        var replaceMent = args[continuation];
        continuation++;
        return replaceMent;
      });
    }
  }]);
  return Route;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Route());

/***/ }),

/***/ "./resources/assets/admin/fluent_forms_global.js":
/*!*******************************************************!*\
  !*** ./resources/assets/admin/fluent_forms_global.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Request.js */ "./resources/assets/admin/Request.js");
/* harmony import */ var _Rest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rest.js */ "./resources/assets/admin/Rest.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


(function ($) {
  var FluentFormsGlobal = /*#__PURE__*/function () {
    function FluentFormsGlobal() {
      _classCallCheck(this, FluentFormsGlobal);
      _defineProperty(this, "request", _Request_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
      _defineProperty(this, "$rest", _Rest_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.fluent_forms_global_var = window.fluent_forms_global_var;
      this.url = fluent_forms_global_var.ajaxurl;
      $.ajaxSetup({
        data: {
          fluent_forms_admin_nonce: this.fluent_forms_global_var.fluent_forms_admin_nonce
        }
      });
    }
    _createClass(FluentFormsGlobal, [{
      key: "$get",
      value: function $get(data) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        url = url || this.url;
        return $.get(url, data);
      }
    }, {
      key: "$post",
      value: function $post(data) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        url = url || this.url;
        return $.post(url, data);
      }
    }]);
    return FluentFormsGlobal;
  }();
  window.FluentFormsGlobal = new FluentFormsGlobal();
})(jQuery);

/***/ }),

/***/ "./resources/assets/admin/css/fluent-all-forms.scss":
/*!**********************************************************!*\
  !*** ./resources/assets/admin/css/fluent-all-forms.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/admin_notices.scss":
/*!*******************************************************!*\
  !*** ./resources/assets/admin/css/admin_notices.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/admin_docs.scss":
/*!****************************************************!*\
  !*** ./resources/assets/admin/css/admin_docs.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/add-ons.scss":
/*!*************************************************!*\
  !*** ./resources/assets/admin/css/add-ons.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/fluent_gutenblock.scss":
/*!***********************************************************!*\
  !*** ./resources/assets/admin/css/fluent_gutenblock.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/public/scss/fluent-forms-public.scss":
/*!***************************************************************!*\
  !*** ./resources/assets/public/scss/fluent-forms-public.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/public/scss/fluentform-public-default.scss":
/*!*********************************************************************!*\
  !*** ./resources/assets/public/scss/fluentform-public-default.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/preview/preview.scss":
/*!***********************************************!*\
  !*** ./resources/assets/preview/preview.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/public/scss/choices.scss":
/*!***************************************************!*\
  !*** ./resources/assets/public/scss/choices.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/elementor/fluent-forms-elementor-widget.scss":
/*!***********************************************************************!*\
  !*** ./resources/assets/elementor/fluent-forms-elementor-widget.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/conversion_templates/design_css.scss":
/*!*********************************************************************!*\
  !*** ./resources/assets/admin/conversion_templates/design_css.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/styles/index.less":
/*!**************************************************!*\
  !*** ./resources/assets/admin/styles/index.less ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/element-ui-css.scss":
/*!********************************************************!*\
  !*** ./resources/assets/admin/css/element-ui-css.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/fluent-forms-admin.scss":
/*!************************************************************!*\
  !*** ./resources/assets/admin/css/fluent-forms-admin.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/assets/admin/css/settings_global.scss":
/*!*********************************************************!*\
  !*** ./resources/assets/admin/css/settings_global.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/fluent_forms_global": 0,
/******/ 			"css/fluent-forms-admin-sass": 0,
/******/ 			"css/settings_global": 0,
/******/ 			"css/element-ui-css": 0,
/******/ 			"css/fluent-forms-admin": 0,
/******/ 			"css/add-ons": 0,
/******/ 			"css/admin_docs": 0,
/******/ 			"css/fluent-all-forms": 0,
/******/ 			"css/conversational_design": 0,
/******/ 			"css/fluent-forms-elementor-widget": 0,
/******/ 			"css/choices": 0,
/******/ 			"css/preview": 0,
/******/ 			"css/fluentform-public-default": 0,
/******/ 			"css/fluent-forms-public": 0,
/******/ 			"css/fluent_gutenblock": 0,
/******/ 			"css/admin_notices": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/fluent_forms_global.js")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/styles/index.less")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/element-ui-css.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/fluent-forms-admin.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/settings_global.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/fluent-all-forms.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/admin_notices.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/admin_docs.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/add-ons.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/css/fluent_gutenblock.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/public/scss/fluent-forms-public.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/public/scss/fluentform-public-default.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/preview/preview.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/public/scss/choices.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/elementor/fluent-forms-elementor-widget.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/fluent-forms-admin-sass","css/settings_global","css/element-ui-css","css/fluent-forms-admin","css/add-ons","css/admin_docs","css/fluent-all-forms","css/conversational_design","css/fluent-forms-elementor-widget","css/choices","css/preview","css/fluentform-public-default","css/fluent-forms-public","css/fluent_gutenblock","css/admin_notices"], () => (__webpack_require__("./resources/assets/admin/conversion_templates/design_css.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=fluent_forms_global.js.map