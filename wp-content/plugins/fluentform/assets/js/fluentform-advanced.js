/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/assets/public/Pro/_ConditionClass.js":
/*!********************************************************!*\
  !*** ./resources/assets/public/Pro/_ConditionClass.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(e, r) { return new BabelRegExp(e, void 0, r); }; var e = RegExp.prototype, r = new WeakMap(); function BabelRegExp(e, t, p) { var o = new RegExp(e, t); return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype); } function buildGroups(e, t) { var p = r.get(t); return Object.keys(p).reduce(function (r, t) { var o = p[t]; if ("number" == typeof o) r[t] = e[o];else { for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++; r[t] = e[o[i]]; } return r; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) { var t = e.exec.call(this, r); if (t) { t.groups = buildGroups(t, this); var p = t.indices; p && (p.groups = buildGroups(p, this)); } return t; }, BabelRegExp.prototype[Symbol.replace] = function (t, p) { if ("string" == typeof p) { var o = r.get(this); return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function (e, r) { var t = o[r]; return "$" + (Array.isArray(t) ? t.join("$") : t); })); } if ("function" == typeof p) { var i = this; return e[Symbol.replace].call(this, t, function () { var e = arguments; return "object" != _typeof(e[e.length - 1]) && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e); }); } return e[Symbol.replace].call(this, t, p); }, _wrapRegExp.apply(this, arguments); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ConditionApp = /*#__PURE__*/function () {
  function ConditionApp(fields, formData) {
    _classCallCheck(this, ConditionApp);
    this.fields = fields;
    this.formData = formData;
    this.counter = 0;
    this.field_statues = {};
  }
  _createClass(ConditionApp, [{
    key: "setFields",
    value: function setFields(fields) {
      this.fields = fields;
    }
  }, {
    key: "setFormData",
    value: function setFormData(data) {
      this.formData = data;
    }
  }, {
    key: "getCalculatedStatuses",
    value: function getCalculatedStatuses() {
      for (var _i = 0, _Object$keys = Object.keys(this.fields); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var item = this.fields[key];
        this.field_statues[key] = this.evaluate(item, key);
      }
      return this.field_statues;
    }
  }, {
    key: "evaluate",
    value: function evaluate(item, key) {
      var _this = this;
      var mainResult = false;
      if (item.status) {
        this.counter++;
        var type = item.type;
        var result = 1;
        if (type == 'any') {
          result = 0;
        }
        item.conditions.forEach(function (condition) {
          var evalValue = _this.getItemEvaluateValue(condition, _this.formData[condition.field]);
          if (evalValue && _this.fields[condition.field] && condition.field != key) {
            evalValue = _this.evaluate(_this.fields[condition.field], condition.field);
          }
          if (type == 'any') {
            if (evalValue) {
              result = 1;
            }
          } else {
            // For All
            if (!evalValue && result) {
              result = false;
            }
          }
        });
        mainResult = result == 1;
      }
      if (item.status && item.conditions.length && !mainResult) {
        return mainResult;
      }
      if (item.container_condition) {
        mainResult = this.evaluate(item.container_condition);
      }
      return mainResult;
    }
  }, {
    key: "getItemEvaluateValue",
    value: function getItemEvaluateValue(item, val) {
      val = val || null;
      var $el = jQuery("[name='".concat(item.field, "']"));
      if (item.operator == '=') {
        //when condition value is empty
        if (item.value === '') {
          return val === null;
        }
        // this value can be array or string
        if (_typeof(val) == 'object') {
          return val !== null && val.indexOf(item.value) != -1;
        }
        if ($el.hasClass('ff_numeric')) {
          return this.parseFormattedNumericValue($el, val) == this.parseFormattedNumericValue($el, item.value);
        }
        return val == item.value;
      } else if (item.operator == '!=') {
        if (_typeof(val) == 'object') {
          return val !== null && val.indexOf(item.value) == -1;
        }
        if ($el.hasClass('ff_numeric')) {
          return this.parseFormattedNumericValue($el, val) != this.parseFormattedNumericValue($el, item.value);
        }
        return val != item.value;
      } else if (item.operator == '>') {
        return val && this.parseFormattedNumericValue($el, val) > this.parseFormattedNumericValue($el, item.value);
      } else if (item.operator == '<') {
        return val && this.parseFormattedNumericValue($el, val) < this.parseFormattedNumericValue($el, item.value);
      } else if (item.operator == '>=') {
        return val && this.parseFormattedNumericValue($el, val) >= this.parseFormattedNumericValue($el, item.value);
      } else if (item.operator == '<=') {
        return val && this.parseFormattedNumericValue($el, val) <= this.parseFormattedNumericValue($el, item.value);
      } else if (item.operator == 'startsWith') {
        return val && val.startsWith(item.value);
      } else if (item.operator == 'endsWith') {
        return val && val.endsWith(item.value);
      } else if (item.operator == 'contains') {
        return val !== null && val.indexOf(item.value) != -1;
      } else if (item.operator == 'doNotContains') {
        return val !== null && val.indexOf(item.value) == -1;
      } else if (item.operator == 'test_regex') {
        var globalRegex = this.stringToRegex(item.value);
        val = val || '';
        return globalRegex.test(val);
      }
      return false;
    }
  }, {
    key: "stringToRegex",
    value: function stringToRegex(regex) {
      var _String$match;
      var _ref = ((_String$match = String(regex).match( /*#__PURE__*/_wrapRegExp(/^\/(.*)\/([gimsuy]*)$/, {
          body: 1,
          flags: 2
        }))) === null || _String$match === void 0 ? void 0 : _String$match.groups) || {},
        body = _ref.body,
        flags = _ref.flags;
      if (body) {
        flags = flags ? flags : 'g';
        return RegExp(body, flags);
      }
      return new RegExp(regex, 'g');
    }
  }, {
    key: "parseFormattedNumericValue",
    value: function parseFormattedNumericValue($el, val) {
      if ($el.hasClass('ff_numeric')) {
        var formatConfig = JSON.parse($el.attr('data-formatter'));
        return currency(val, formatConfig).value;
      }
      return Number(val) || 0;
    }
  }]);
  return ConditionApp;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConditionApp);

/***/ }),

/***/ "./resources/assets/public/Pro/calculations.js":
/*!*****************************************************!*\
  !*** ./resources/assets/public/Pro/calculations.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findAll: () => (/* binding */ findAll),
/* harmony export */   getName: () => (/* binding */ getName),
/* harmony export */   isContain: () => (/* binding */ isContain),
/* harmony export */   mexpToken: () => (/* binding */ mexpToken)
/* harmony export */ });
var mexpToken = [{
  type: 8,
  token: 'round',
  show: 'round',
  value: function value(_value) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!decimals && decimals !== 0) {
      decimals = 2;
    }
    _value = parseFloat(_value).toFixed(decimals);
    return parseFloat(_value);
  }
}, {
  type: 0,
  token: 'ceil',
  show: 'ceil',
  value: function value(a) {
    return Math.ceil(a);
  }
}, {
  type: 0,
  token: 'floor',
  show: 'floor',
  value: function value(a) {
    return Math.floor(a);
  }
}, {
  type: 0,
  token: 'abs',
  show: 'abs',
  value: function value(a) {
    return Math.abs(a);
  }
}, {
  type: 8,
  token: 'max',
  show: 'max',
  value: function value(a, b) {
    if (a > b) return a;
    return b;
  }
}, {
  type: 8,
  token: 'min',
  show: 'min',
  value: function value(a, b) {
    if (a < b) return a;
    return b;
  }
}];

// polyfill for matchAll
function findAll(regexPattern, sourceString) {
  var output = [];
  var match;
  // make sure the pattern has the global flag
  var regexPatternWithGlobal = RegExp(regexPattern, "g");
  while (match = regexPatternWithGlobal.exec(sourceString)) {
    // get rid of the string copy
    delete match.input;
    // store the match data
    output.push(match);
  }
  return output;
}
function isContain(item, value) {
  return item.indexOf(value) !== -1;
}
function getName(item, replace) {
  var regx = new RegExp(replace + '|}', 'g');
  return item.replace(regx, '');
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($, $theForm) {
  var calculationFields = $theForm.find('.ff_has_formula');
  if (!calculationFields.length) {
    return;
  }
  var repeaterTriggerCache = {};
  var repeaterInputsTriggerCache = {};
  mexp.addToken(mexpToken);
  var doCalculation = function doCalculation() {
    jQuery.each(calculationFields, function (index, field) {
      var $field = jQuery(field);
      var formula = $field.data('calculation_formula');
      var regEx = /{(.*?)}/g;
      // let matches = [...formula.matchAll(regEx)];
      var matches = findAll(regEx, formula);
      var replaces = {};
      jQuery.each(matches, function (index, match) {
        var itemKey = match[0];
        jQuery.each(['{input.', '{select.', '{checkbox.', '{radio.', '{repeat.', '{payment.'], function (prefixIndex, prefix) {
          if (isContain(itemKey, prefix)) {
            var name = getName(itemKey, prefix);
            var value = 0;
            if (prefix === '{select.') {
              value = getSelectFieldValue(name);
            } else if (prefix === '{checkbox.') {
              value = getCheckboxValue(name);
            } else if (prefix === '{radio.') {
              value = getRadioFieldValue(name);
            } else if (prefix === '{repeat.') {
              value = getRepeatFieldValue(name);
            } else if (prefix === '{payment.') {
              value = getPaymentFieldValue(name);
            } else {
              var $el = $theForm.find('input[name=' + name + ']');
              if (isAccessible($el)) {
                value = window.ff_helper.numericVal($el);
              }
            }
            replaces[itemKey] = value;
            return false; // to break out of this loop
          }
        });
      });
      jQuery.each(replaces, function (key, value) {
        if (!value) {
          value = 0;
        }
        formula = formula.split(key).join(value);
      });
      var calculatedValue = '';
      try {
        formula = formula.replace(/\n/g, "");
        calculatedValue = mexp.eval(formula);
        if (isNaN(calculatedValue)) {
          calculatedValue = '';
        }
      } catch (error) {
        console.log(error, field);
      }
      if ($field[0].type == 'text') {
        var $fieldDom = $($field);
        var prevValue = $fieldDom.val();
        var formattedValue = window.ff_helper.formatCurrency($fieldDom, calculatedValue);
        $fieldDom.val(formattedValue).prop('defaultValue', formattedValue);
        if (prevValue == '') {
          return;
        }
        if (prevValue != formattedValue) {
          $fieldDom.trigger('change');
        }
      } else {
        $field.text(calculatedValue);
      }
    });
  };
  function isAccessible($el) {
    if ($el.closest('.ff_excluded.has-conditions').length) {
      return false;
    }
    return true;
  }
  function getDataCalcValue(selector) {
    var itemValue = 0;
    var selectedItems = $theForm.find(selector);
    if (selectedItems.closest('.ff_excluded.has-conditions').length) {
      return itemValue;
    }
    $.each(selectedItems, function (indexItem, item) {
      var eachItemValue = $(item).attr('data-calc_value');
      if (eachItemValue && !isNaN(eachItemValue)) {
        itemValue += Number(eachItemValue);
      }
    });
    return itemValue;
  }

  /**
   * Init Calculation input number fild
   */
  var initNumberCalculations = function initNumberCalculations() {
    $theForm.find('input[type=number],input[data-calc_value],select[data-calc_value],.ff_numeric,.ff_payment_item').on('change keyup', doCalculation);
    doCalculation();
    $theForm.on('do_calculation', function () {
      doCalculation();
    });
  };
  function getRepeatFieldValue(name) {
    var value = 0;
    // We may have column index here
    var splits = name.split('.');
    var indexName = false;
    if (splits.length > 1) {
      name = splits[0];
      indexName = splits[1];
    }
    var $targetTable = $theForm.find('table[data-root_name=' + name + ']');
    if (!repeaterTriggerCache[name]) {
      repeaterTriggerCache[name] = true;
      $targetTable.on('repeat_change', function () {
        doCalculation();
      });
    }
    if (isAccessible($targetTable)) {
      if (!indexName) {
        value = $targetTable.find('tbody tr').length;
      } else {
        var tds = $targetTable.find('tbody tr td:nth-child(' + indexName + ')');
        $.each(tds, function (tdIndex, td) {
          var $tdInput = $(td).find(':input');
          var cacheName = name + '_' + indexName + '_' + $tdInput.attr('id');
          if (!repeaterInputsTriggerCache[cacheName]) {
            repeaterInputsTriggerCache[cacheName] = true;
            $tdInput.on('change', function () {
              doCalculation();
            });
          }
          var parsedValue = 0;
          if ($tdInput.attr('type') === 'select') {
            parsedValue = parseFloat($tdInput.find('option:selected').attr('data-calc_value'));
          } else {
            parsedValue = parseFloat($tdInput.val());
          }
          if (!isNaN(parsedValue)) {
            value += parsedValue;
          }
        });
        if (value) {
          value = value.toFixed(2);
        }
      }
    }
    return value;
  }
  function getPaymentFieldValue(name) {
    var value = 0;
    var $elem = $theForm.find(':input[data-name=' + name + ']');
    if ($elem.length && isAccessible($elem)) {
      var elementType = $elem[0].type;
      if (elementType === 'radio') {
        value = getRadioFieldValue(name, true);
      } else if (elementType === 'hidden') {
        value = $elem.attr('data-payment_value');
      } else if (elementType === 'number' || elementType === 'text') {
        value = window.ff_helper.numericVal($elem);
      } else if (elementType === 'checkbox') {
        value = getCheckboxValue(name, true);
      } else if (elementType === 'select-one') {
        value = getSelectFieldValue(name, true);
      }
    }
    return value;
  }
  function getRadioFieldValue(name) {
    var forPaymentField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var value = 0;
    var $el = $theForm.find('input[name=' + name + ']:checked');
    if (forPaymentField) {
      return $el.attr('data-payment_value');
    }
    if (isAccessible($el)) {
      value = $el.attr('data-calc_value') || 0;
    }
    return value;
  }
  function getSelectFieldValue(name) {
    var forPaymentField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var value = 0;
    if (forPaymentField) {
      return $theForm.find('select[name=' + name + '] option:selected').data('payment_value');
    }
    value = getDataCalcValue('select[data-name=' + name + '] option:selected');
    $theForm.find('select[data-name=' + name + ']').attr('data-calc_value', value);
    return value;
  }
  function getCheckboxValue(name) {
    var forPaymentField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!forPaymentField) {
      return getDataCalcValue('input[data-name=' + name + ']:checked');
    }
    var $elem = $theForm.find(':input[data-name=' + name + ']');
    var groupId = $elem.data('group_id');
    var groups = $theForm.find('input[data-group_id="' + groupId + '"]:checked');
    var groupTotal = 0;
    groups.each(function (index, group) {
      var itemPrice = jQuery(group).data('payment_value');
      if (itemPrice) {
        groupTotal += parseFloat(itemPrice);
      }
    });
    return groupTotal;
  }
  initNumberCalculations();
}

/***/ }),

/***/ "./resources/assets/public/Pro/dom-net-promoter.js":
/*!*********************************************************!*\
  !*** ./resources/assets/public/Pro/dom-net-promoter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var initNetPromoter = function initNetPromoter($, $form) {
  /**
   * Rating element
   */
  var netPromoterDoms = $form.find(".jss-ff-el-net-promoter");
  if (!netPromoterDoms.length) {
    return;
  }
  $.each(netPromoterDoms, function (index, netPromoterDom) {
    var $netPromoterDoms = $(netPromoterDom);
    // Default selected icons
    // $netPromoterDoms.find("label.active").prevAll().addClass("active");
    $netPromoterDoms.on('click', 'label', function (e) {
      var $this = $(this);
      /**
       * Mark active to all previous and currently hovered elements
       * And mark inactive to the next ones!
       */
      $this.addClass("active");
      $this.prevAll().removeClass("active");
      $this.nextAll().removeClass("active");
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initNetPromoter);

/***/ }),

/***/ "./resources/assets/public/Pro/dom-rating.js":
/*!***************************************************!*\
  !*** ./resources/assets/public/Pro/dom-rating.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($, $form) {
  /**
   * Rating element
   */
  var ratingDoms = $form.find(".jss-ff-el-ratings");
  if (!ratingDoms.length) {
    return;
  }
  $.each(ratingDoms, function (index, ratingDom) {
    var $ratingDom = $(ratingDom);
    // Default selected icons
    $ratingDom.find("label.active").prevAll().addClass("active");
    $ratingDom.on('mouseenter', 'label', function (e) {
      var $this = $(this);
      var targetId = $this.find('input').attr('id');
      var ratingTextSelector = "[data-id=" + targetId + "]";

      /**
       * Mark active to all previous and currently hovered elements
       * And mark inactive to the next ones!
       */
      $this.addClass("active");
      $this.prevAll().addClass("active");
      $this.nextAll().removeClass("active");
      $this.closest(".ff-el-input--content").find(".ff-el-rating-text").css('display', 'none');
      $this.closest(".ff-el-input--content").find(ratingTextSelector).css("display", "inline-block");
    })
    // When clicked on the icon
    .on('click', 'label', function (e) {
      var $this = $(this);
      var $icon = $this.find(".jss-ff-svg");
      $icon.addClass('scale');
      $icon.addClass('scalling');
      setTimeout(function (_) {
        $icon.removeClass('scalling');
        $icon.removeClass('scale');
      }, 150);
    })
    // When mouse leaved from the rating icons
    .on('mouseleave', function (e) {
      var $this = $(this);
      var targetId = $this.find("input:checked").attr("id");
      var ratingTextSelector = "[data-id=" + targetId + "]";
      var checkedStar = $this.find("input:checked").parent("label");

      /**
       * Only checked item's prior elements will be marked
       * And rest will be unmarked
       */
      if (!checkedStar.length) {
        $this.find('label').removeClass('active');
      } else {
        checkedStar.addClass("active");
        checkedStar.prevAll().addClass("active");
        checkedStar.nextAll().removeClass("active");
      }
      $this.closest(".ff-el-input--content").find(".ff-el-rating-text").css("display", "none");
      $this.closest(".ff-el-input--content").find(ratingTextSelector).css("display", "inline-block");
    });
  });
}

/***/ }),

/***/ "./resources/assets/public/Pro/dom-repeat.js":
/*!***************************************************!*\
  !*** ./resources/assets/public/Pro/dom-repeat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initRepeatButtons: () => (/* binding */ initRepeatButtons),
/* harmony export */   initRepeater: () => (/* binding */ initRepeater)
/* harmony export */ });
var initRepeatButtons = function initRepeatButtons($, $form) {
  var repeat = $form.find('.fluentform .js-repeat'); // this is the old version
  $.each(repeat, function (index, repeatItem) {
    var $repeatItem = $(repeatItem);
    var repeatCols = $repeatItem.find('.ff-t-cell').length;
    if (repeatCols > 1) {
      var containerHeight = $repeatItem.find('.ff-el-group').height();
      var elementHeight = $repeatItem.find('.ff-el-group').find('.ff-el-input--content').height();
      var marginTop = containerHeight - elementHeight;
      $repeatItem.find('.js-repeat-buttons').css('margin-top', marginTop + 'px');
    }
    var elementInputHeight = $repeatItem.find('.ff-el-group').find('.ff-el-input--content .ff-el-form-control').outerHeight();
    $repeatItem.find('.ff-el-repeat-buttons').height(elementInputHeight);
  });
};
var registerRepeaterButtonsOldVersion = function registerRepeaterButtonsOldVersion($theForm) {
  $theForm.on('click', '.js-repeat .repeat-plus', function (e) {
    var btnPlus = jQuery(this);
    var repeatParent = btnPlus.closest('.ff-el-repeat');
    var maxRepeat = parseInt(repeatParent.data('max_repeat'));
    var currentRepeatItems = repeatParent.find('.ff-t-cell:first-child .ff-el-input--content > input').length;
    if (maxRepeat && maxRepeat <= currentRepeatItems) {
      return;
    }
    if (maxRepeat && maxRepeat - currentRepeatItems == 1) {
      repeatParent.find('.repeat-plus').hide();
    }
    var btnSet = btnPlus.closest('div');
    var index = btnSet.index();
    var itemLength = btnPlus.closest('.ff-el-input--content').find('.ff-t-cell').length;
    btnPlus.closest('.ff-el-input--content').find('.ff-t-cell').each(function (i, div) {
      var el = jQuery(this).find('.ff-el-form-control:last-child');
      var tabIndex = el.attr('tabindex');
      var cloned = el.clone();
      var newId = 'ffrpt-' + new Date().getTime() + i;
      var itemProp = {
        value: '',
        id: newId
      };
      if (tabIndex) {
        itemProp.tabIndex = parseInt(tabIndex) + itemLength;
      }
      cloned.prop(itemProp);
      cloned.insertAfter(el);
    });
    btnSet.clone().insertAfter(btnSet);
    btnPlus.closest('.ff-el-input--content').find('.ff-t-cell').eq(0).find("input:eq(".concat(index + 1, ")")).focus();
  });
  $theForm.on('click', '.js-repeat .repeat-minus', function (e) {
    var isDeleted = false;
    var btnMinus = jQuery(this);
    var btnSet = btnMinus.closest('div');
    var repeatParent = btnMinus.closest('.ff-el-repeat');
    repeatParent.find('.repeat-plus').show();
    btnMinus.closest('.ff-el-input--content').find('.ff-t-cell').each(function () {
      var index = btnSet.index();
      var el = jQuery(this).find('.ff-el-form-control:eq(' + index + ')');
      if (btnSet.siblings().length) {
        isDeleted = el.remove().length;
      }
    });
    isDeleted && btnSet.remove();
  });
};
var registerRepeaterHandler = function registerRepeaterHandler($theForm) {
  // Get the screen type from local storage
  var screenType = window.localStorage.getItem('ff_window_type');

  // Add screen type classes
  if (jQuery('.ff_form_preview').length) {
    jQuery('.ff_flexible_table').addClass(screenType);
  }

  // Add mobile class to repeater fields on screen mobile view
  $theForm.on('screen-change', function (e, width) {
    if (jQuery('.ff_form_preview').length) {
      if (width === '375px') {
        jQuery('.ff_flexible_table').addClass('mobile');
      } else {
        jQuery('.ff_flexible_table').removeClass('mobile');
      }
    }
  });
  $theForm.on('click', '.js-repeater .repeat-plus', function (e) {
    var $btnPlus = jQuery(this);
    var $table = $btnPlus.closest('table');
    var $tr = $btnPlus.closest('tr');
    var maxRepeat = parseInt($table.attr('data-max_repeat'));
    var existingCount = $table.find('tbody tr').length;
    if (maxRepeat && existingCount == maxRepeat) {
      $table.addClass('repeat-maxed');
      return;
    }
    var $freshCopy = $tr.clone();
    $freshCopy.find('td').each(function (i, td) {
      var el = jQuery(this).find('.ff-el-form-control:last-child');
      var newId = 'ffrpt-' + new Date().getTime() + i;
      var itemProp = {
        value: el.attr('data-default') || '',
        id: newId
      };
      el.prop(itemProp);
      var dataMask = el.attr('data-mask');
      if (dataMask) {
        el.mask(dataMask);
      }
    });
    $freshCopy.insertAfter($tr);

    // Now let's fix the name
    var rootName = $table.attr('data-root_name');
    var firstTabIndex = 0;
    $table.find('tbody tr').each(function (i, td) {
      var els = jQuery(this).find('.ff-el-form-control');
      els.each(function (index, el) {
        var $el = jQuery(el);
        if (i == 0) {
          firstTabIndex = $el.attr('tabindex');
        }
        $el.prop({
          'name': rootName + '[' + i + '][]'
        });
        $el.attr('data-name', rootName + '_' + index + '_' + i);
        if (firstTabIndex) {
          $el.attr('tabindex', firstTabIndex);
        }
      });
    });
    $freshCopy.find('.ff-el-form-control')[0].focus();
    $table.trigger('repeat_change');
    if (maxRepeat && existingCount + 1 == maxRepeat) {
      $table.addClass('repeat-maxed');
    }
  });
  $theForm.on('click', '.js-repeater .repeat-minus', function (e) {
    var $btnMinus = jQuery(this);
    var $table = $btnMinus.closest('table');
    var existingCount = $table.find('tbody tr').length;
    if (existingCount == 1) {
      return;
    }
    $btnMinus.closest('tr').remove();
    $table.removeClass('repeat-maxed');

    // Now let's fix the name
    var rootName = $table.attr('data-root_name');
    $table.find('tbody tr').each(function (i, td) {
      var els = jQuery(this).find('.ff-el-form-control');
      els.each(function (index, el) {
        jQuery(el).prop({
          'name': rootName + '[' + i + '][]'
        });
      });
    });
    $table.trigger('repeat_change');
  });
};
var initRepeater = function initRepeater($theForm) {
  registerRepeaterButtonsOldVersion($theForm);
  registerRepeaterHandler($theForm);
};


/***/ }),

/***/ "./resources/assets/public/Pro/file-uploader.js":
/*!******************************************************!*\
  !*** ./resources/assets/public/Pro/file-uploader.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($, $form, form, fluentFormVars, formSelector) {
  /**
   * Register file uploaders
   * @return {void}
   */
  var initUploader = function initUploader() {
    if (!jQuery.fn.fileupload) {
      return;
    }
    $form.find('input[type="file"]').each(function (key, el) {
      var element = $(this),
        uploadedList;

      // Set files thumbnail list container
      uploadedList = $('<div/>', {
        "class": 'ff-uploaded-list',
        style: 'font-size:12px; margin-top: 15px;'
      });
      element.closest('div').append(uploadedList);
      // original width for preview filename ellipsis
      var maxWidth = uploadedList.width();

      // Set maximum allowed files count protection
      var rules = form.rules[element.prop('name')];
      var maxFiles = rules['max_file_count']['value'];
      if ('max_file_count' in rules) {
        rules['max_file_count']['remaining'] = Number(maxFiles);
      }

      // Set html accept property for file types
      var acceptedFileTypes = '';
      if ('allowed_file_types' in rules) {
        acceptedFileTypes = rules.allowed_file_types.value.join('|');
        element.prop('accept', '.' + acceptedFileTypes.replace(/\|/g, ',.'));
      } else {
        acceptedFileTypes = rules.allowed_image_types.value.join('|');
        if (acceptedFileTypes) {
          element.prop('accept', '.' + acceptedFileTypes.replace(/\|/g, ',.'));
        } else {
          element.prop('accept', 'image/*');
        }
      }
      function showUploadError(msg) {
        var elName = element.prop('name');
        $form.trigger('show_element_error', {
          element: elName,
          message: msg
        });
      }
      function changeValidation(e, data) {
        if (!data || !data.files || !data.files.length) {
          return;
        }
        $form.find('.ff-upload-preview-elem').remove();
        // return true;
        if ('max_file_count' in rules) {
          $(formSelector + '_errors').empty();
          $(this).closest('div').find('.error').html('');
          var remaining = rules['max_file_count']['remaining'];
          if (!remaining || data.files.length > remaining) {
            var msg = 'Maximum 1 file is allowed!';
            msg = maxFiles > 1 ? 'Maximum ' + maxFiles + ' files are allowed!' : msg;
            if (rules.max_file_count && rules.max_file_count.message) {
              msg = rules.max_file_count.message;
            }
            showUploadError(msg);
            return false;
          }
        }
        var validationErrors = validateFile(data.files[0], form.rules[element.prop('name')]);
        if (validationErrors.length) {
          showUploadError(validationErrors.join(', '));
          return false;
        }
        return true;
      }
      function getFormData($form) {
        var formData = $form.serializeArray();
        formData.push({
          name: 'action',
          value: 'fluentform_file_upload'
        });
        formData.push({
          name: 'formId',
          value: form.id
        });
        return formData;
      }
      var $el = $(el);

      // Init the uploader
      element.fileupload({
        dataType: 'json',
        dropZone: element.closest('.ff-el-group'),
        url: fluentFormVars.ajaxUrl,
        formData: getFormData,
        change: changeValidation,
        add: function add(e, data) {
          if (!changeValidation(e, data)) {
            return;
          }
          var previewContainer = $('<div/>', {
            "class": 'ff-upload-preview'
          });
          data.context = previewContainer;
          var previewThumb = $('<div/>', {
            "class": 'ff-upload-thumb'
          });
          var previewDetails = $('<div/>', {
            "class": 'ff-upload-details'
          });
          var thumb = $('<div/>', {
            "class": 'ff-upload-preview-img',
            style: "background-image: url('".concat(getThumbnail(data.files[0]), "');")
          });
          var errorInline = $('<div>', {
            "class": 'ff-upload-error',
            style: 'color:red;'
          });
          var fileProgress = $('<span/>', {
            html: fluentFormVars.upload_start_txt,
            "class": 'ff-upload-progress-inline-text ff-inline-block'
          });

          // Set inline progress bar
          var progressBarInline = $("\n\t\t\t\t\t\t\t\t\t<div class=\"ff-upload-progress-inline ff-el-progress\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"ff-el-progress-bar\"></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t");
          var fileName = $('<div/>', {
            "class": 'ff-upload-filename',
            text: data.files[0].name
          });
          var removeBtn = $('<span/>', {
            'data-href': '#',
            'data-attachment-id': '',
            'html': '&times;',
            'class': 'ff-upload-remove'
          });
          var fileSize = $('<div>', {
            "class": 'ff-upload-filesize ff-inline-block',
            html: getFileSize(data.files[0].size)
          });
          previewThumb.append(thumb);
          previewDetails.append(fileName, progressBarInline, fileProgress, fileSize, errorInline, removeBtn);
          previewContainer.append(previewThumb, previewDetails);
          uploadedList.append(previewContainer);

          // set width for filename container
          // filename larger than it's container will truncate
          fileName.css({
            maxWidth: maxWidth - 91 // width of left image area
            + 'px'
          });
          data.submit();
          data.context.addClass('ff_uploading');
        },
        progress: function progress(e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          data.context.find('.ff-el-progress-bar').css('width', progress + '%');
          data.context.find('.ff-upload-progress-inline-text').text(fluentFormVars.uploading_txt);
        },
        done: function done(e, data) {
          data.context.removeClass('ff_uploading');
          if (data.result && 'data' in data.result && 'files' in data.result.data) {
            if ('error' in data.result.data.files[0]) {
              // Error given by WP (wp_handle_upload)
              showUploadError('Upload Error: ' + data.result.data.files[0].error);
              data.context.remove();
            } else {
              data.context.find('.ff-upload-progress-inline-text').text(fluentFormVars.upload_completed_txt);
              rules['max_file_count']['remaining'] -= 1;
              data.context.attr('data-src', data.result.data.files[0].url);
              data.context.find('.ff-upload-remove').attr({
                'data-href': data.result.data.files[0].file,
                'data-attachment-id': data.result.data.files[0].attachment_id
              });
              data.context.addClass('ff_uploading_complete');
              $form.find('input[name=' + $el.data('name') + ']').trigger('change');
            }
          } else {
            // For debugging purpose to catch devlopment erros,
            // this check might not be needing in production.
            var message = 'Sorry! The upload failed for some unknown reason.';
            if (data.messages) {
              var keys = Object.keys(data.messages);
              if (keys.length) {
                message = data.messages[keys[0]];
              }
            }
            showUploadError(message);
            data.context.remove();
          }
        },
        fail: function fail(e, data) {
          var errors = [];
          data.context.remove();
          if (data.jqXHR.responseJSON && data.jqXHR.responseJSON.errors) {
            $.each(data.jqXHR.responseJSON.errors, function (key, error) {
              if (_typeof(error) == 'object') {
                $.each(error, function (i, msg) {
                  errors.push(msg);
                });
              } else {
                errors.push(error);
              }
            });
          } else if (data.jqXHR.responseText) {
            errors.push(data.jqXHR.responseText);
          } else {
            errors.push('Something is wrong when uploading the file! Please try again');
          }
          showUploadError(errors.join(', '));
        }
      });
      $el.on('change_remaining', function (e, data) {
        rules['max_file_count']['remaining'] += data;
      });
    });

    // handling accessibility
    $form.find('.ff_upload_btn').on('keyup', function (e) {
      if (e.keyCode == 32) {
        $(this).siblings('input[type=file]').trigger('click');
      }
    });
  };

  /**
   * Get thumbnail image for file upload preview
   * @param  {file} file
   * @return {mixed}
   */
  var getThumbnail = function getThumbnail(file) {
    if (!!file.type.match('image')) {
      return URL.createObjectURL(file);
    }
    var canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 60;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, 60, 60);
    ctx.font = "13px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(file.name.substr(file.name.lastIndexOf('.') + 1), 30, 30, 60);
    return canvas.toDataURL();
  };

  /**
   * Get formatted file size to show in preview
   * @param  {int} size
   * @return {string}
   */
  var getFileSize = function returnFileSize(size) {
    if (size < 1024) {
      return size + 'bytes';
    } else if (size >= 1024 && size <= 1048576) {
      return (size / 1024).toFixed(1) + 'KB';
    } else if (size > 1048576) {
      return (size / 1048576).toFixed(1) + 'MB';
    }
  };

  /**
   * Register event handler to delete uploaded file
   * @return {void}
   */
  var registerFileRemove = function registerFileRemove() {
    $form.find('.ff-uploaded-list').on('click', '.ff-upload-remove', function (e) {
      e.preventDefault();
      var elFiles,
        $this = $(this),
        parent = $this.closest('.ff-uploaded-list'),
        $el = parent.closest('.ff-el-input--content').find('input[type=file]'),
        filePath = $this.attr('data-href'),
        attachmentId = $this.attr('data-attachment-id');
      if (filePath == '#') {
        $this.closest('.ff-upload-preview').remove();
        if (!parent.find('.ff-upload-preview').length) {
          parent.siblings('.ff-upload-progress').addClass('ff-hidden');
        }
        $el.trigger('change_remaining', 1);
      } else {
        $.post(fluentFormVars.ajaxUrl, {
          path: filePath,
          attachment_id: attachmentId,
          action: 'fluentform_delete_uploaded_file'
        }).then(function (response) {
          var element = $this.closest('.ff-el-input--content').find('input');
          $el.trigger('change_remaining', 1);
          $this.closest('.ff-upload-preview').remove();
          if (!parent.find('.ff-upload-preview').length) {
            parent.siblings('.ff-upload-progress').addClass('ff-hidden');
          }
          $el.trigger('change');
        });
      }
    });
  };

  /**
   * Validate a file before uploading
   * @param  {file}
   * @return {array}
   */
  var validateFile = function validateFile(file, rules) {
    // return [];
    var validationErrors = [];

    // Accepted file types validation
    var fileTypes = '';
    var fileTypesMessage = '';
    if ('allowed_file_types' in rules) {
      fileTypes = rules['allowed_file_types']['value'];
      fileTypesMessage = rules['allowed_file_types']['message'];
    } else if ('allowed_image_types' in rules) {
      fileTypes = rules['allowed_image_types']['value'];
      fileTypesMessage = rules['allowed_image_types']['message'];
    }
    if (fileTypes) {
      var acceptFileTypes = new RegExp('(' + fileTypes.join('|') + ')', 'i');
      var fileExt = file['name'].split('.').pop();
      fileExt = fileExt.toLowerCase();
      if (!acceptFileTypes.test(fileExt)) {
        validationErrors.push(fileTypesMessage);
      }
    }

    // Maximum file size validation
    if ('max_file_size' in rules && file['size'] > rules['max_file_size']['value']) {
      validationErrors.push(rules['max_file_size']['message']);
    }
    return validationErrors;
  };
  initUploader();
  registerFileRemove();
  $(document.body).on('fluentform_reset', function () {
    initUploader();
  });
}
;

/***/ }),

/***/ "./resources/assets/public/Pro/form-conditionals.js":
/*!**********************************************************!*\
  !*** ./resources/assets/public/Pro/form-conditionals.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConditionClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ConditionClass */ "./resources/assets/public/Pro/_ConditionClass.js");

var formConditional = function formConditional($, $theForm, form) {
  /**
   * Container to store all conditional
   *  logics recieved from the server
   *
   * @type {Object}
   */
  var formSelector = '.' + form.form_instance;
  var formCondition = function formCondition() {
    var watchableFields = {};
    var formData = {};
    var getTheForm = function getTheForm() {
      return $(formSelector);
    };

    /**
     * Register all the required handlers
     * for elements those, who have conditions
     *
     * @return void
     */
    var init = function init() {
      if (!form.conditionals) {
        return;
      }
      $.each(form.conditionals, function (fieldName, field) {
        if (!fieldName) {
          return;
        }
        $.each(field.conditions, function (index, condition) {
          var el = getElement(condition.field);
          watchableFields[el.prop('name')] = el;
        });
      });
      formData = getFormData();
      var conditionAppInstance = new _ConditionClass__WEBPACK_IMPORTED_MODULE_0__["default"](form.conditionals, formData);
      $.each(watchableFields, function (name, el) {
        el.on('change', function () {
          formData = getFormData();
          conditionAppInstance.setFormData(formData);
          hideShowElements(conditionAppInstance.getCalculatedStatuses());
        });
      });
      hideShowElements(conditionAppInstance.getCalculatedStatuses());
    };
    var hideShowElements = function hideShowElements(items) {
      $.each(items, function (itemName, status) {
        var el = getElement(itemName);
        var $parent = el.closest('.has-conditions');
        if (status) {
          if ($parent.css('height') == '0px') {
            $parent.attr("style", "");
          }
          $parent.removeClass('ff_excluded').addClass('ff_cond_v').slideDown(200);
        } else {
          $parent.removeClass('ff_cond_v').addClass('ff_excluded').slideUp(200);
        }
      });
      $theForm.trigger('do_calculation');
    };
    var getFormData = function getFormData() {
      var data = {};
      $.each(watchableFields, function (name, el) {
        var type = el.prop('type') || el.attr('data-type');
        if (type == 'radio') {
          data[name] = '';
          el.each(function (index, item) {
            if ($(item).is(':checked')) {
              data[name] = $(item).val();
            }
          });
        } else if (type == 'checkbox') {
          name = name.replace('[]', '');
          data[name] = [];
          el.each(function (index, item) {
            if ($(item).is(':checked')) {
              data[name].push($(item).val());
            }
          });
        } else if (type == 'select-multiple') {
          name = name.replace('[]', '');
          var val = el.val();
          if (val) {
            data[name] = val;
          } else {
            data[name] = [];
          }
        } else if (type == 'file') {
          var file_urls = '';
          var $el = $theForm.find('input[name=' + name + ']');
          $el.closest('.ff-el-input--content').find('.ff-uploaded-list').find('.ff-upload-preview[data-src]').each(function (i, div) {
            file_urls += $(this).data('src');
          });
          data[name] = file_urls;
        } else {
          data[name] = el.val();
        }
      });
      return data;
    };

    /**
     * Resolve a dom element as jQuery object
     *
     * @param  string name
     * @return jQuery instance
     */
    var getElement = function getElement(name) {
      var $theform = getTheForm();
      var el = $("[data-name='" + name + "']", $theform);
      el = el.length ? el : $("[name='" + name + "']", $theform);
      return el.length ? el : $("[name='" + name + "[]']", $theform);
    };
    return {
      init: init
    };
  };
  formCondition().init();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formConditional);

/***/ }),

/***/ "./resources/assets/public/Pro/slider.js":
/*!***********************************************!*\
  !*** ./resources/assets/public/Pro/slider.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($, $theForm, fluentFormVars, formSelector) {
  /**
   * Active form step
   * @type {Number}
   */
  var activeStep = 0;
  var wrapperWidth = '';
  fluentFormVars.stepAnimationDuration = parseInt(fluentFormVars.stepAnimationDuration);
  var stepPersistency = $theForm.find('.ff-step-container').attr('data-enable_step_data_persistency') == 'yes';
  var stepResume = false;
  if (stepPersistency) {
    stepResume = $theForm.find('.ff-step-container').attr('data-enable_step_page_resume') == 'yes';
  }
  var isRtl = !!window.fluentFormVars.is_rtl;
  var isPopulatingStepData = false;

  /**
   * Remove prev button from first step
   * @return void
   */
  var removePrevFromFirstFirstStep = function removePrevFromFirstFirstStep() {
    $theForm.find('.fluentform-step:first').find('.step-nav [data-action="prev"]').remove();
  };
  var getFormInstance = function getFormInstance() {
    return window.fluentFormApp($theForm);
  };
  var initFormWithSavedState = function initFormWithSavedState() {
    if (!stepPersistency) return;
    jQuery(document).ready(function (e) {
      jQuery.getJSON(fluentFormVars.ajaxUrl, {
        form_id: $theForm.data('form_id'),
        action: 'fluentform_step_form_get_data'
      }).then(function (data) {
        if (data) {
          populateFormDataAndSetActiveStep(data);
        }
      });
    });
  };
  var populateFormDataAndSetActiveStep = function populateFormDataAndSetActiveStep(_ref) {
    var response = _ref.response,
      step_completed = _ref.step_completed;
    var choiceJsInputs = [];
    jQuery.each(response, function (key, value) {
      if (!value) return;
      var type = Object.prototype.toString.call(value);
      if (type === '[object Object]') {
        var $el = jQuery("[data-name=".concat(key, "]"));
        if ($el.length && $el.attr('data-type') === 'tabular-element') {
          // Tabular Grid
          jQuery.each(value, function (row, columns) {
            var $checkboxes = jQuery("[name=\"".concat(key, "[").concat(row, "]\\[\\]\"]"));
            if (!$checkboxes.length) {
              $checkboxes = jQuery("[name=\"".concat(key, "[").concat(row, "]\"]"));
            }
            jQuery.each($checkboxes, function (i, cbox) {
              var $val = $(cbox).val();
              if (jQuery.inArray($val, columns) !== -1 || $val === columns) {
                $(cbox).prop('checked', true).change();
              }
            });
          });
        } else if ($el.attr('data-type') === 'chained-select') {
          // Chained Select
          var data = {
            meta_key: $el.find('select:first').attr('data-meta_key'),
            form_id: $el.closest('form').attr('data-form_id'),
            action: 'fluentform_get_chained_select_options',
            'filter_options': 'all',
            'keys': value
          };
          jQuery.getJSON(fluentFormVars.ajaxUrl, data).then(function (response) {
            jQuery.each(response, function (key, options) {
              var $select = $el.find("select[data-key='".concat(key, "']"));
              if ($select.attr('data-index') != 0) {
                jQuery.each(options, function (k, val) {
                  $select.append(jQuery('<option />', {
                    value: val,
                    text: val
                  }));
                });
              }
              $select.attr('disabled', false).val(value[key]);
            });
          });
        } else {
          // Names, Address e.t.c. fields
          jQuery.each(value, function (k, v) {
            jQuery("[name=\"".concat(key, "[").concat(k, "]\"]")).val(v).change();
          });
        }
      } else if (type === '[object Array]') {
        var _$el = jQuery("[name=".concat(key, "]"));
        _$el = _$el.length ? _$el : jQuery("[data-name=".concat(key, "]"));
        _$el = _$el.length ? _$el : jQuery("[name=".concat(key, "\\[\\]]"));
        if (_$el.attr('type') == 'file') {
          addFilesToElement(_$el, value);
        } else if (_$el.prop('multiple')) {
          if ($.isFunction(window.Choices)) {
            var choiceJs = _$el.data('choicesjs');
            choiceJsInputs.push({
              handler: choiceJs,
              values: value
            });
          } else {
            _$el.val(value).change();
          }
        } else if (_$el.attr('data-type') === 'repeater_field') {
          // Repeater Field
          var $tbody = _$el.find('tbody');
          var elName = _$el.attr('data-name');
          jQuery.each(value, function (index, arr) {
            if (index == 0) {
              $tbody.find('tr:first .ff-el-form-control').each(function (i, el) {
                $(el).val(arr[i]).change();
              });
              return;
            }
            var $tr = $tbody.find('tr:last').clone().appendTo($tbody);
            $tr.find('.ff-el-form-control').each(function (i, el) {
              var id = 'ffrpt-' + new Date().getTime() + i;
              $(el).val(arr[i]);
              $(el).attr({
                id: id,
                name: "".concat(elName, "[").concat(index, "][]"),
                value: arr[i]
              }).change();
            });
          });
        } else {
          // Checkbox Groups
          _$el.each(function (i, $elem) {
            if (jQuery.inArray($($elem).val(), value) != -1) {
              $($elem).prop('checked', true).change();
            }
          });
        }
      } else {
        // Others
        var _$el2 = jQuery("[name=".concat(key, "]"));
        if (_$el2.prop('type') === 'radio' || _$el2.prop('type') === 'checkbox') {
          jQuery("[name=".concat(key, "][value=\"").concat(value, "\"]")).prop('checked', true).change();
        } else {
          var $canvas = _$el2.closest('.ff-el-group').find('.fluentform-signature-pad');
          if ($canvas.length) {
            var canvas = $canvas[0];
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.src = value;
            img.onload = function () {
              ctx.drawImage(img, 0, 0);
            };
          }
          _$el2.val(value).change();
        }
      }
    });
    // populate ChoiceJs Values separately as it breaks the loop
    if (choiceJsInputs.length > 0) {
      for (var i = 0; i < choiceJsInputs.length; i++) {
        choiceJsInputs[i].handler.setValue(choiceJsInputs[i].values).change();
      }
    }
    isPopulatingStepData = true;
    // let saveProgressForm = $(formSelector).hasClass('ff-form-has-save-progress');
    // if (stepResume || saveProgressForm) {
    if (stepResume) {
      updateSlider(step_completed, fluentFormVars.stepAnimationDuration, true);
    }
    isPopulatingStepData = false;
  };

  /**
   * Register event handlers for form
   * steps slider initialization
   *
   * @return void
   */
  var initStepSlider = function initStepSlider() {
    var stepsWrapper = $theForm.find('.ff-step-body');
    var formSteps = $theForm.find('.fluentform-step');
    var totalSteps = formSteps.length;
    var stepTitles = $theForm.find('.ff-step-titles li');
    wrapperWidth = 100 * totalSteps + '%';
    stepsWrapper.css({
      width: wrapperWidth
    });
    formSteps.css({
      width: 100 / totalSteps + '%'
    });
    $(formSteps[activeStep]).addClass('active');
    $(stepTitles[activeStep]).addClass('active');

    // submit button should only be printed on last step
    if (formSteps.length && !formSteps.last().hasClass('active')) {
      $theForm.find('button[type="submit"]').css('display', 'none');
    }
    stepProgressBarHandle({
      activeStep: activeStep,
      totalSteps: totalSteps
    });
    registerStepNavigators(fluentFormVars.stepAnimationDuration);
    registerClickableStepNav(stepTitles, formSteps);
  };

  /**
   * Register clickable step navigation
   * @param  {object} stepTitlesNavs
   * @param {object} formSteps
   */
  var registerClickableStepNav = function registerClickableStepNav(stepTitlesNavs, formSteps) {
    if (stepTitlesNavs.length === 0) {
      return;
    }
    $.each(stepTitlesNavs, function (i, elm) {
      $(elm).attr('data-step-number', i);
    });
    stepTitlesNavs.on('click', function (e) {
      var formInstance = getFormInstance();
      var $this = $(this);
      var currentStep = 0;
      try {
        var targetStep = $this.data('step-number');
        if (isNaN(targetStep)) {
          return;
        }
        //validate other steps before target step before next step
        $.each(formSteps, function (index, steps) {
          currentStep = index;
          if (index < targetStep) {
            var elements = $(steps).find(':input').not(':button').filter(function (i, el) {
              return !$(el).closest('.has-conditions').hasClass('ff_excluded');
            });
            elements.length && formInstance.validate(elements);
          }
        });
        updateSlider(targetStep, fluentFormVars.stepAnimationDuration, true);
      } catch (e) {
        if (!(e instanceof window.ffValidationError)) {
          throw e;
        }
        updateSlider(currentStep, fluentFormVars.stepAnimationDuration, true);
        formInstance.showErrorMessages(e.messages);
        formInstance.scrollToFirstError(350);
      }
    });
  };

  /**
   * Action occurs on step change/form load
   * @param  {object} stepData
   * @return {void}
   */
  var stepProgressBarHandle = function stepProgressBarHandle(stepData) {
    if ($theForm.find('.ff-el-progress').length) {
      var totalSteps = stepData.totalSteps,
        activeStep = stepData.activeStep;
      var completeness = 100 / totalSteps * (activeStep + 1);
      var stepTitles = $theForm.find('.ff-el-progress-title li');
      var progressBar = $theForm.find('.ff-step-header .ff-el-progress-bar');
      var span = progressBar.find('span');
      // progress bar completeness
      progressBar.css({
        width: completeness + '%'
      });
      if (completeness) {
        progressBar.append(span.text(parseInt(completeness) + '%'));
      } else {
        span.empty();
      }
      // $theForm.find('.ff-el-progress-status').text(`${activeStep} out of ${totalSteps} Completed`);
      var stepText = fluentFormVars.step_text;
      var stepTitle = $(stepTitles[activeStep]).text();
      stepText = stepText.replace('%activeStep%', activeStep + 1).replace('%totalStep%', totalSteps).replace('%stepTitle%', stepTitle);
      $theForm.find('.ff-el-progress-status').html(stepText);
      stepTitles.css('display', 'none');
      $(stepTitles[activeStep]).css('display', 'inline');
    }
  };

  /**
   * Register event handlers for form
   * steps to move forward or backward
   *
   * @return void
   */
  var registerStepNavigators = function registerStepNavigators(animDuration) {
    $(document).on('keydown', formSelector + ' .fluentform-step > .step-nav button', function (e) {
      if (e.which == 9) {
        if ($(this).data('action') == 'next') {
          e.preventDefault();
        }
      }
    });
    $(formSelector).on('click', '.fluentform-step  .step-nav button, .fluentform-step  .step-nav img', function (e) {
      var btn = $(this).data('action');
      var actionType = 'next';
      var current = $(this).closest('.fluentform-step');
      var formInstance = getFormInstance();
      if (btn == 'next') {
        try {
          var elements = current.find(':input').not(':button').filter(function (i, el) {
            return !$(el).closest('.has-conditions').hasClass('ff_excluded');
          });
          elements.length && formInstance.validate(elements);
          activeStep++;
        } catch (e) {
          if (!(e instanceof window.ffValidationError)) {
            throw e;
          }
          formInstance.showErrorMessages(e.messages);
          formInstance.scrollToFirstError(350);
          return;
        }
        $theForm.trigger('ff_to_next_page', activeStep);
        jQuery(document).trigger('ff_to_next_page', {
          step: activeStep,
          form: $theForm
        });
        var formSteps = $theForm.find('.fluentform-step');
        $theForm.trigger('ff_render_dynamic_smartcodes', $(formSteps[activeStep]));
      } else {
        activeStep--;
        actionType = 'prev';
        $theForm.trigger('ff_to_prev_page', activeStep);
        jQuery(document).trigger('ff_to_prev_page', {
          step: activeStep,
          form: $theForm
        });
      }
      var autoScroll = $theForm.find('.ff-step-container').attr('data-disable_auto_focus') != 'yes';
      updateSlider(activeStep, animDuration, autoScroll, actionType);
    });
  };

  /**
   * Update slider position in multisteps form
   * @param  {int} goBackToStep
   * @param  {int} animDuration
   * @param  {bool} isScrollTop
   * @return {void}
   */
  var updateSlider = function updateSlider(goBackToStep, animDuration) {
    var isScrollTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var actionType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'next';
    $('div' + formSelector + '_errors').empty();
    activeStep = goBackToStep;
    var stepsWrapper = $theForm.find('.ff-step-body');
    var stepTitles = $theForm.find('.ff-step-titles li'),
      formSteps = $theForm.find('.fluentform-step'),
      totalSteps = formSteps.length,
      formTop = $theForm.offset().top - (!!$('#wpadminbar') ? 32 : 0) - 20;

    // change active step
    formSteps.removeClass('active');
    $(formSteps[activeStep]).addClass('active');

    // change step title
    stepTitles.removeClass('ff_active ff_completed');
    $.each(_toConsumableArray(Array(activeStep).keys()), function (setp) {
      $($(stepTitles[setp])).addClass('ff_completed');
    });
    $(stepTitles[activeStep]).addClass('ff_active');

    // animate step on click next/prev
    var scrollTop = function scrollTop() {
      if (window.ff_disable_step_scroll) {
        return;
      }
      var scrollElement = $theForm.find('.ff_step_start');
      if (window.ff_scroll_top_offset) {
        var formTop = window.ff_scroll_top_offset;
      } else {
        var formTop = scrollElement.offset().top - 20;
      }
      var isInViewport = function isInViewport($el) {
        var elementTop = $el.offset().top;
        var elementBottom = elementTop + $el.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
      };
      var isVisible = isInViewport(scrollElement);
      if (!isVisible || window.ff_force_scroll) {
        $('html, body').delay(animDuration).animate({
          scrollTop: formTop
        }, 0);
      }
    };
    var inlineCssObj = {
      left: -(activeStep * 100) + '%'
    };
    if (isRtl) {
      inlineCssObj = {
        right: -(activeStep * 100) + '%'
      };
    }
    var animationType = $(formSteps[activeStep]).closest('.ff-step-container').data('animation_type');
    switch (animationType) {
      case 'slide':
        //slide
        stepsWrapper.animate(inlineCssObj, animDuration, function () {
          isScrollTop && scrollTop();
          stepsWrapper.css({
            width: wrapperWidth
          });
        });
        break;
      case 'fade':
        //fadeIn
        stepsWrapper.css({
          opacity: 0
        });
        stepsWrapper.animate(inlineCssObj, animDuration, function () {
          isScrollTop && scrollTop();
          stepsWrapper.css({
            width: wrapperWidth
          });
        });
        stepsWrapper.animate({
          opacity: 1
        }, animDuration);
        break;
      case 'slide_down':
        //slideDown
        stepsWrapper.hide();
        stepsWrapper.css(inlineCssObj);
        stepsWrapper.slideDown(animDuration);
        break;
      case 'none':
        //fadeIn
        stepsWrapper.css(inlineCssObj);
        break;
      default:
        stepsWrapper.css(inlineCssObj);
    }

    //skip saving the last step
    var isLastStep = activeStep === 0;

    // Fire ajax request to persist the step state/data
    if (stepPersistency && !isPopulatingStepData & !isLastStep) {
      saveStepData($theForm, activeStep).then(function (response) {
        console.log(response);
      });
    }

    // update progressbar
    stepProgressBarHandle({
      activeStep: activeStep,
      totalSteps: totalSteps
    });

    // now we have to check if there has any visible elements or not

    // submit button should only be printed on last step
    if (formSteps.last().hasClass('active')) {
      $theForm.find('button[type="submit"]').css('display', 'inline-block');
      return;
    } else {
      $theForm.find('button[type="submit"]').css('display', 'none');
    }
    if (!window.ff_disable_auto_step) {
      var timeout = 0;
      if ($theForm.find('.fluentform-step.active .ff_excluded').length) {
        timeout = 50;
      }
      setTimeout(function () {
        var $activeStepDom = $theForm.find('.fluentform-step.active');
        var childDomCounts = $theForm.find('.fluentform-step.active > div').length - 1;
        var hiddenDomCounts = $theForm.find('.fluentform-step.active > .ff_excluded').length;
        if ($theForm.find('.fluentform-step.active > .ff-t-container').length) {
          childDomCounts -= $theForm.find('.fluentform-step.active > .ff-t-container').length;
          childDomCounts += $theForm.find('.fluentform-step.active > .ff-t-container > .ff-t-cell > div').length;
          hiddenDomCounts += $theForm.find('.fluentform-step.active > .ff-t-container > .ff-t-cell > .ff_excluded').length;
          if ($theForm.find('.fluentform-step.active > .ff-t-container.ff_excluded').length) {
            hiddenDomCounts -= $theForm.find('.fluentform-step.active > .ff-t-container.ff_excluded').length;
            hiddenDomCounts -= $theForm.find('.fluentform-step.active > .ff-t-container.ff_excluded > .ff-t-cell > .ff_excluded').length;
            hiddenDomCounts += $theForm.find('.fluentform-step.active > .ff-t-container.ff_excluded > .ff-t-cell > div').length;
          }
        }
        if (childDomCounts == hiddenDomCounts) {
          $activeStepDom.find('.step-nav button[data-action=' + actionType + '], .step-nav img[data-action=' + actionType + ']').click();
        }
      }, timeout);
    }
  };
  var saveStepData = function saveStepData($theForm, activeStep) {
    var $inputs = $theForm.find(':input').filter(function (i, el) {
      return !$(el).closest('.has-conditions').hasClass('ff_excluded');
    });
    $inputs.filter(function (i, el) {
      var $el = $(el);
      return $el.parents().hasClass('ff_repeater_table') && $el.attr('type') == 'select' && !$el.val();
    }).prepend('<option selected disabled />');
    var inputData = $inputs.serialize();
    var hasFiles = false;
    $.each($theForm.find('[type=file]'), function (index, fileInput) {
      var params = {},
        fileInputName = fileInput.name + '[]';
      params[fileInputName] = [];
      $(fileInput).closest('div').find('.ff-uploaded-list').find('.ff-upload-preview[data-src]').each(function (i, div) {
        params[fileInputName][i] = $(this).data('src');
      });
      $.each(params, function (k, v) {
        if (v.length) {
          var obj = {};
          obj[k] = v;
          inputData += '&' + $.param(obj);
          hasFiles = true;
        }
      });
    });
    var formData = {
      active_step: activeStep,
      data: inputData,
      form_id: $theForm.data('form_id'),
      action: 'fluentform_step_form_save_data'
    };
    return jQuery.post(fluentFormVars.ajaxUrl, formData);
  };
  var maybeAutoSlider = function maybeAutoSlider() {
    var autoSlider = $theForm.find('.ff-step-container').attr('data-enable_auto_slider') == 'yes';
    if (!autoSlider) {
      return;
    }
    function maybeAction($el) {
      var count = $el.closest('.fluentform-step.active').find('.ff-el-group:not(.ff_excluded):not(.ff-custom_html)').length;
      if (count == 1) {
        var condCounts = $el.closest('.fluentform-step.active').find('.ff_excluded').length;
        if (condCounts) {
          var timeout = window.ffTransitionTimeOut || 400;
          setTimeout(function () {
            $el.closest('.fluentform-step.active').find('.ff-btn-next').trigger('click');
          }, timeout);
        } else {
          $el.closest('.fluentform-step.active').find('.ff-btn-next').trigger('click');
        }
      }
    }
    $theForm.find('.ff-el-form-check-radio,.ff-el-net-label, .ff-el-ratings label').on('click', function () {
      maybeAction($(this));
    });
    $theForm.find('select').on('change', function () {
      maybeAction($(this));
    });
  };
  var addFilesToElement = function addFilesToElement($el, fileUrls) {
    var $uploadedList = $el.closest('.ff-el-input--content').find('.ff-uploaded-list');
    $.each(fileUrls, function (index, file) {
      file = _typeof(file) === 'object' ? file : {
        url: file,
        data_src: file
      };
      var previewContainer = $('<div/>', {
        "class": 'ff-upload-preview',
        'data-src': file.data_src,
        style: 'border: 1px solid rgb(111, 117, 125)'
      });
      var previewThumb = $('<div/>', {
        "class": 'ff-upload-thumb'
      });
      previewThumb.append($('<div/>', {
        "class": 'ff-upload-preview-img',
        style: "background-image: url('".concat(getThumbnail(file.url), "');")
      }));
      var previewDetails = $('<div/>', {
        "class": 'ff-upload-details'
      });
      var fileProgress = $('<span/>', {
        html: fluentFormVars.upload_completed_txt,
        "class": 'ff-upload-progress-inline-text ff-inline-block'
      });
      var name = file.url.substring(file.url.lastIndexOf('/') + 1);
      if (name.includes('-ff-')) {
        name = name.substring(name.lastIndexOf('-ff-') + 4);
      }
      var fileName = $('<div/>', {
        "class": 'ff-upload-filename',
        html: name
      });
      var progressBarInline = $("\n\t\t\t\t\t\t\t\t\t<div class=\"ff-upload-progress-inline ff-el-progress\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100%;\" class=\"ff-el-progress-bar\"></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t");
      var removeBtn = $('<span/>', {
        'data-href': '#',
        'html': '&times;',
        'class': 'ff-upload-remove'
      });
      var fileSize = $('<div>', {
        "class": 'ff-upload-filesize ff-inline-block',
        html: ''
      });
      var errorInline = $('<div>', {
        "class": 'ff-upload-error',
        style: 'color:red;'
      });
      previewDetails.append(fileName, progressBarInline, fileProgress, fileSize, errorInline, removeBtn);
      previewContainer.append(previewThumb, previewDetails);
      $uploadedList.append(previewContainer);
    });
    $el.trigger('change_remaining', -fileUrls.length);
    $el.trigger('change');
  };
  var getThumbnail = function getThumbnail(file) {
    var extension = file.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
    if (['jpg', 'jpeg', 'gif', 'png'].indexOf(extension) != -1) {
      return file;
    }
    var canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 60;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, 60, 60);
    ctx.font = "13px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(extension, 30, 30, 60);
    return canvas.toDataURL();
  };
  var init = function init() {
    initFormWithSavedState();
    removePrevFromFirstFirstStep();
    initStepSlider();
    maybeAutoSlider();
  };
  return {
    init: init,
    updateSlider: updateSlider,
    populateFormDataAndSetActiveStep: populateFormDataAndSetActiveStep
  };
}

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************************!*\
  !*** ./resources/assets/public/fluentform-advanced.js ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pro_dom_net_promoter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pro/dom-net-promoter */ "./resources/assets/public/Pro/dom-net-promoter.js");
/* harmony import */ var _Pro_dom_repeat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pro/dom-repeat */ "./resources/assets/public/Pro/dom-repeat.js");
/* harmony import */ var _Pro_dom_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pro/dom-rating */ "./resources/assets/public/Pro/dom-rating.js");
/* harmony import */ var _Pro_form_conditionals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pro/form-conditionals */ "./resources/assets/public/Pro/form-conditionals.js");
/* harmony import */ var _Pro_file_uploader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pro/file-uploader */ "./resources/assets/public/Pro/file-uploader.js");
/* harmony import */ var _Pro_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pro/slider */ "./resources/assets/public/Pro/slider.js");
/* harmony import */ var _Pro_calculations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pro/calculations */ "./resources/assets/public/Pro/calculations.js");







(function ($) {
  $(document.body).on('fluentform_init', function (e, $theForm, form) {
    var formInstanceSelector = $theForm.attr('data-form_instance');
    if (!form) {
      console.log('No Fluent form JS vars found!');
      return;
    }
    var formId = form.form_id_selector;
    var formSelector = '.' + form.form_instance;
    function maybeUpdateDynamicLabels(workStep) {
      jQuery.each(workStep.find('.ff_dynamic_value'), function (index, item) {
        var ref = $(item).data('ref');
        if (ref == 'payment_summary') {
          $theForm.trigger('calculate_payment_summary', {
            element: $(item)
          });
          return;
        }
        var refElement = $theForm.find('.ff-el-form-control[name="' + ref + '"]');
        var separator = ' ';
        if (!refElement.length) {
          refElement = $theForm.find('.ff-field_container[data-name="' + ref + '"]').find('input');
        }
        if (!refElement.length) {
          // This may radio element / Checkbox element
          refElement = $theForm.find('*[name="' + ref + '"]:checked');
          if (!refElement.length) {
            refElement = $theForm.find('*[name="' + ref + '[]"]:checked');
            separator = ', ';
          }

          // maybe it's a multi-select item
          if (!refElement.length) {
            refElement = $theForm.find('*[name="' + ref + '[]"]').find('option:selected');
            separator = ', ';
          }
        }
        var refValues = [];
        $.each(refElement, function () {
          var inputValue = $(this).val();
          // if(inputValue) {
          //     let tagName = $(this).prop("tagName");
          //     if (tagName == 'OPTION') {
          //         inputValue = $(this).text();
          //     } else if (tagName == 'SELECT') {
          //         inputValue = $(this).find('option:selected').text();
          //     } else if (tagName == 'INPUT' && $(this).attr('type') == 'checkbox') {
          //         inputValue = $(this).parent().find('span').html();
          //     }
          // }
          if (inputValue) {
            refValues.push(inputValue);
          }
        });
        var replaceValue = '';
        if (refValues.length) {
          replaceValue = refValues.join(separator);
        } else {
          replaceValue = $(item).data('fallback');
        }
        $(this).html(replaceValue);
      });
    }

    /*
    * Normals
     */
    (0,_Pro_file_uploader__WEBPACK_IMPORTED_MODULE_4__["default"])($, $theForm, form, window.fluentFormVars, formSelector);
    (0,_Pro_dom_repeat__WEBPACK_IMPORTED_MODULE_1__.initRepeater)($theForm);
    (0,_Pro_dom_repeat__WEBPACK_IMPORTED_MODULE_1__.initRepeatButtons)($, $theForm);
    (0,_Pro_form_conditionals__WEBPACK_IMPORTED_MODULE_3__["default"])($, $theForm, form, window.fluentFormVars);
    (0,_Pro_calculations__WEBPACK_IMPORTED_MODULE_6__["default"])($, $theForm);
    (0,_Pro_dom_rating__WEBPACK_IMPORTED_MODULE_2__["default"])($, $theForm);
    (0,_Pro_dom_net_promoter__WEBPACK_IMPORTED_MODULE_0__["default"])($, $theForm);
    if ($theForm.hasClass('ff-form-has-steps')) {
      var sliderInstance = (0,_Pro_slider__WEBPACK_IMPORTED_MODULE_5__["default"])($, $theForm, window.fluentFormVars, formSelector);
      sliderInstance.init();
      $theForm.on('update_slider', function (e, data) {
        sliderInstance.updateSlider(data.goBackToStep, data.animDuration, data.isScrollTop, data.actionType);
      });
    }
    if ($theForm.hasClass('ff_has_dynamic_smartcode')) {
      $theForm.on('ff_render_dynamic_smartcodes', function (e, selector) {
        maybeUpdateDynamicLabels($(selector));
      });
      $theForm.on('keyup change', ':input', function () {
        maybeUpdateDynamicLabels($theForm);
      });
      maybeUpdateDynamicLabels($theForm);
    }
  });
})(jQuery);

// Polyfill for startsWith and endsWith
(function (sp) {
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
  if (!sp.startsWith) {
    sp.startsWith = function (search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos;
      return this.substring(pos, pos + search.length) === search;
    };
  }

  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
  if (!sp.endsWith) {
    sp.endsWith = function (search, this_len) {
      if (this_len === undefined || this_len > this.length) {
        this_len = this.length;
      }
      return this.substring(this_len - search.length, this_len) === search;
    };
  }

  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
  if (!sp.includes) {
    sp.includes = function (search, start) {
      if (search instanceof RegExp) {
        throw TypeError('first argument must not be a RegExp');
      }
      if (start === undefined) {
        start = 0;
      }
      return this.indexOf(search, start) !== -1;
    };
  }
})(String.prototype);
})();

/******/ })()
;
//# sourceMappingURL=fluentform-advanced.js.map