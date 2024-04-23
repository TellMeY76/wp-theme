/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/public/form-submission.js ***!
  \****************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jQuery(document).ready(function () {
  // ios hack to keep the recaptcha on viewport on success
  window.fluentFormrecaptchaSuccessCallback = function (response) {
    if (window.innerWidth < 768 && /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      var el = jQuery('.g-recaptcha').filter(function (i, el) {
        return grecaptcha.getResponse(i) == response;
      });
      if (el.length) {
        jQuery('html, body').animate({
          scrollTop: el.first().offset().top - jQuery(window).height() / 2
        }, 0);
      }
    }
  };

  /**
   * Custom Error/Exception
   */
  window.ffValidationError = function () {
    var ffValidationError = function ffValidationError() {};
    ffValidationError.prototype = Object.create(Error.prototype);
    ffValidationError.prototype.constructor = ffValidationError;
    return ffValidationError;
  }();
  window.ff_helper = {
    numericVal: function numericVal($el) {
      if ($el.hasClass('ff_numeric')) {
        var formatConfig = JSON.parse($el.attr('data-formatter'));
        return currency($el.val(), formatConfig).value;
      }
      return $el.val() || 0;
    },
    formatCurrency: function formatCurrency($el, value) {
      if ($el.hasClass('ff_numeric')) {
        var formatConfig = JSON.parse($el.attr('data-formatter'));
        return currency(value, formatConfig).format();
      }
      return value;
    }
  };
  (function (fluentFormVars, $) {
    if (!fluentFormVars) {
      fluentFormVars = {};
    }
    fluentFormVars.stepAnimationDuration = parseInt(fluentFormVars.stepAnimationDuration);
    var fluentFormAppStore = {};
    window.fluentFormApp = function ($theForm) {
      var formInstanceSelector = $theForm.attr('data-form_instance');
      var form = window['fluent_form_' + formInstanceSelector];
      if (!form) {
        console.log('No Fluent form JS vars found!');
        return false;
      }
      if (fluentFormAppStore[formInstanceSelector]) {
        return fluentFormAppStore[formInstanceSelector];
      }
      var formId = form.form_id_selector;
      var formSelector = '.' + formInstanceSelector;

      /**
       * Form Handler module
       * @param  validator Factory
       * @return void
       */
      return function (validator) {
        var globalValidators = {};
        var isSending = false;
        /**
         * Register all the event handlers
         *
         * @return void
         */
        var initFormHandlers = function initFormHandlers() {
          registerFormSubmissionHandler();
          maybeInlineForm();
          initInlineErrorItems();
          $theForm.removeClass('ff-form-loading').addClass('ff-form-loaded');
          $theForm.on('show_element_error', function (e, data) {
            showErrorBelowElement(data.element, data.message);
          });
        };
        var getTheForm = function getTheForm() {
          return $('body').find('form' + formSelector);
        };
        var maybeInlineForm = function maybeInlineForm() {
          if ($theForm.hasClass('ff-form-inline')) {
            $theForm.find('button.ff-btn-submit').css('height', '50px');
          }
        };
        var fireUpdateSlider = function fireUpdateSlider(goBackToStep, animDuration) {
          var isScrollTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var actionType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'next';
          $theForm.trigger('update_slider', {
            goBackToStep: goBackToStep,
            animDuration: animDuration,
            isScrollTop: isScrollTop,
            actionType: actionType
          });
        };
        var fireGlobalBeforeSendCallbacks = function fireGlobalBeforeSendCallbacks($theForm, formData) {
          var processItemsDeferred = [];
          var processFunctions = globalValidators;
          if ($theForm.hasClass('ff_has_v3_recptcha')) {
            processFunctions.ff_v3_recptcha = function ($theForm, formData) {
              var dfd = jQuery.Deferred();
              var siteKey = $theForm.data('recptcha_key');
              grecaptcha.execute(siteKey, {
                action: 'submit'
              }).then(function (token) {
                formData['data'] += '&' + jQuery.param({
                  'g-recaptcha-response': token
                });
                dfd.resolve();
              });
              return dfd.promise();
            };
          }
          jQuery.each(processFunctions, function (itemKey, item) {
            processItemsDeferred.push(item($theForm, formData));
          });
          return jQuery.when.apply(jQuery, processItemsDeferred);
        };
        var submissionAjaxHandler = function submissionAjaxHandler($theForm) {
          try {
            var $inputs = $theForm.find(':input').filter(function (i, el) {
              return !$(el).closest('.has-conditions').hasClass('ff_excluded');
            });
            validate($inputs);
            var formData = {
              data: $inputs.serialize(),
              action: 'fluentform_submit',
              form_id: $theForm.data('form_id')
            };
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
                  formData['data'] += '&' + $.param(obj);
                  hasFiles = true;
                }
              });
            });

            // check if file is uploading
            if ($theForm.find('.ff_uploading').length) {
              var errorHtml = $('<div/>', {
                'class': 'error text-danger'
              });
              var cross = $('<span/>', {
                "class": 'error-clear',
                html: '&times;',
                click: function click(e) {
                  return $(formSelector + '_errors').html('');
                }
              });
              var text = $('<span/>', {
                "class": 'error-text',
                text: 'File upload in progress. Please wait...'
              });
              return $(formSelector + '_errors').html(errorHtml.append(text, cross)).show();
            }

            // Init reCaptcha if available.
            if ($theForm.find('.ff-el-recaptcha.g-recaptcha').length) {
              var recaptchaId = getRecaptchaClientId(formData.form_id);
              if (recaptchaId) {
                formData['data'] += '&' + $.param({
                  'g-recaptcha-response': grecaptcha.getResponse(recaptchaId)
                });
              }
            }

            // Init hCaptcha if available.
            if ($theForm.find('.ff-el-hcaptcha.h-captcha').length) {
              var hcaptchaId = getHcaptchaClientId(formData.form_id);
              if (hcaptchaId) {
                formData['data'] += '&' + $.param({
                  'h-captcha-response': hcaptcha.getResponse(hcaptchaId)
                });
              }
            }

            // Init turnstile if available.
            if ($theForm.find('.ff-el-turnstile.cf-turnstile').length) {
              var turnstileId = getTurnstileClientId(formData.form_id);
              if (turnstileId) {
                formData['data'] += '&' + $.param({
                  'cf-turnstile-response': turnstileId.getResponse(turnstileId)
                });
              }
            }
            $(formSelector + '_success').remove();
            $(formSelector + '_errors').html('');
            $theForm.find('.error').html('');
            $theForm.parent().find('.ff-errors-in-stack').hide();
            fireGlobalBeforeSendCallbacks($theForm, formData).then(function () {
              showFormSubmissionProgress($theForm);
              sendData($theForm, formData);
            });
          } catch (e) {
            if (!(e instanceof ffValidationError)) {
              throw e;
            }
            showErrorMessages(e.messages);
            scrollToFirstError(350);
          }
        };
        var sendData = function sendData($theForm, formData) {
          function addParameterToURL(param) {
            var _url = fluentFormVars.ajaxUrl;
            _url += (_url.split('?')[1] ? '&' : '?') + param;
            return _url;
          }
          var ajaxRequestUrl = addParameterToURL('t=' + Date.now());
          if (this.isSending) {
            return;
          }
          var that = this;
          this.isSending = true;
          $.post(ajaxRequestUrl, formData).then(function (res) {
            if (!res || !res.data || !res.data.result) {
              // This is an error
              $theForm.trigger('fluentform_submission_failed', {
                form: $theForm,
                response: res
              });
              showErrorMessages(res);
              return;
            }
            if (res.data.append_data) {
              addHiddenData(res.data.append_data);
            }
            if (res.data.nextAction) {
              $theForm.trigger('fluentform_next_action_' + res.data.nextAction, {
                form: $theForm,
                response: res
              });
              return;
            }
            $theForm.triggerHandler('fluentform_submission_success', {
              form: $theForm,
              config: form,
              response: res
            });
            jQuery(document.body).trigger('fluentform_submission_success', {
              form: $theForm,
              config: form,
              response: res
            });
            if ('redirectUrl' in res.data.result) {
              if (res.data.result.message) {
                $('<div/>', {
                  'id': formId + '_success',
                  'class': 'ff-message-success'
                }).html(res.data.result.message).insertAfter($theForm);
                $theForm.find('.ff-el-is-error').removeClass('ff-el-is-error');
              }
              location.href = res.data.result.redirectUrl;
              return;
            } else {
              var successMsgId = formId + '_success';
              var successMsgSelector = '#' + successMsgId;
              if ($(successMsgSelector).length) {
                $(successMsgSelector).slideUp('fast');
              }
              $('<div/>', {
                'id': successMsgId,
                'class': 'ff-message-success'
              }).html(res.data.result.message).insertAfter($theForm);
              $theForm.find('.ff-el-is-error').removeClass('ff-el-is-error');
              if (res.data.result.action == 'hide_form') {
                $theForm.hide().addClass('ff_force_hide');
                $theForm[0].reset();
              } else {
                jQuery(document.body).trigger('fluentform_reset', [$theForm, form]);
                $theForm[0].reset();
              }

              // Scroll to success msg if not in viewport
              var successMsg = $(successMsgSelector);
              if (successMsg.length && !isElementInViewport(successMsg[0])) {
                $('html, body').animate({
                  scrollTop: successMsg.offset().top - (!!$('#wpadminbar') ? 32 : 0) - 20
                }, fluentFormVars.stepAnimationDuration);
              }
            }
          }).fail(function (res) {
            $theForm.trigger('fluentform_submission_failed', {
              form: $theForm,
              response: res
            });
            if (!res || !res.responseJSON || !res.responseJSON || !res.responseJSON.errors) {
              showErrorMessages(res.responseText);
              return;
            }
            if (res.responseJSON.append_data) {
              addHiddenData(res.responseJSON.append_data);
            }
            showErrorMessages(res.responseJSON.errors);
            scrollToFirstError(350);
            if ($theForm.find('.fluentform-step').length) {
              var step = $theForm.find('.error').not(':empty:first').closest('.fluentform-step');
              if (step.length) {
                var goBackToStep = step.index();
                fireUpdateSlider(goBackToStep, fluentFormVars.stepAnimationDuration, false);
              }
            }
          }).always(function (res) {
            that.isSending = false;
            hideFormSubmissionProgress($theForm);
            // reset reCaptcha if available.
            if (window.grecaptcha) {
              var reCaptchaId = getRecaptchaClientId(formData.form_id);
              if (reCaptchaId) {
                grecaptcha.reset(reCaptchaId);
              }
            }
            if (window.hcaptcha) {
              hcaptcha.reset(); //two recapthca on same page creates conflicts
            }
            if (window.turnstile) {
              var turnstileId = getTurnstileClientId(formData.form_id);
              if (turnstileId) {
                turnstileId.reset(turnstileId);
              }
            }
          });
        };
        var showFormSubmissionProgress = function showFormSubmissionProgress($form) {
          $form.addClass('ff_submitting');
          $form.find('.ff-btn-submit').addClass('disabled').addClass('ff-working').prop('disabled', true);
        };
        var hideFormSubmissionProgress = function hideFormSubmissionProgress($form) {
          $form.removeClass('ff_submitting');
          $form.find('.ff-btn-submit').removeClass('disabled').removeClass('ff-working').attr('disabled', false);
          $theForm.parent().find('.ff_msg_temp').remove();
        };
        var formResetHandler = function formResetHandler($this) {
          if ($('.ff-step-body', $theForm).length) {
            fireUpdateSlider(0, fluentFormVars.stepAnimationDuration, false);
          }
          $this.find('.ff-el-repeat .ff-t-cell').each(function () {
            $(this).find('input').not(':first').remove();
          });
          $this.find('.ff-el-repeat .ff-el-repeat-buttons-list').find('.ff-el-repeat-buttons').not(':first').remove();

          // reset image type checkbox and radio field
          var checkedTypeInputs = $this.find('input[type=checkbox],input[type=radio]');
          if (checkedTypeInputs.length) {
            checkedTypeInputs.each(function (index, el) {
              el = $(el);
              if (!el.prop('defaultChecked')) {
                el.closest('.ff-el-form-check.ff_item_selected').removeClass('ff_item_selected');
              } else {
                el.closest('.ff-el-form-check').addClass('ff_item_selected');
              }
            });
          }
          $this.find('input[type=file]').closest('div').find('.ff-uploaded-list').html('').end().closest('div').find('.ff-upload-progress').addClass('ff-hidden').find('.ff-el-progress-bar').css('width', '0%');
          var rangeSliders = $this.find('input[type="range"]');
          if (rangeSliders.length) {
            rangeSliders.each(function (index, rangeSlider) {
              rangeSlider = $(rangeSlider);
              rangeSlider.val(rangeSlider.data('calc_value')).change();
            });
          }
          $.each(form.conditionals, function (fieldName, field) {
            $.each(field.conditions, function (index, condition) {
              reset(getElement(condition.field));
            });
          });
        };

        /**
         * Register form submission event handler
         *
         * @return void
         */
        var registerFormSubmissionHandler = function registerFormSubmissionHandler() {
          if ($theForm.attr('data-ff_reinit') == 'yes') {
            return;
          }
          $(document).on('submit', formSelector, function (e) {
            e.preventDefault();
            if (window.ff_sumitting_form) {
              return;
            }
            window.ff_sumitting_form = true;
            setTimeout(function () {
              window.ff_sumitting_form = false;
            }, 1500);
            submissionAjaxHandler($(this));
          });
          $(document).on('reset', formSelector, function (e) {
            formResetHandler($(this));
          });
        };

        /**
         * Retrieve the recaptcha client id for current form
         * @param {int} formId
         * @return {int}
         */
        var getRecaptchaClientId = function getRecaptchaClientId(formId) {
          var formIndex;
          $('form').has('.g-recaptcha').each(function (index, form) {
            if ($(this).attr('data-form_id') == formId) {
              formIndex = index;
            }
          });
          return formIndex;
        };

        /**
         * Retrieve the Hcaptcha client id for current form
         * @param {int} formId
         * @return {int}
         */
        var getHcaptchaClientId = function getHcaptchaClientId(formId) {
          var formIndex;
          $('form').has('.h-captcha').each(function (index, form) {
            if ($(this).attr('data-form_id') == formId) {
              formIndex = index;
            }
          });
          return formIndex;
        };

        /**
         * Retrieve the Turnstile client id for current form
         * @param {int} formId
         * @return {int}
         */
        var getTurnstileClientId = function getTurnstileClientId(formId) {
          var formIndex;
          $('form').has('.cf-turnstile').each(function (index, form) {
            if ($(this).attr('data-form_id') == formId) {
              formIndex = index;
            }
          });
          return formIndex;
        };

        /**
         * Reset the form to initial state
         * @param  {jQuery} el
         * @return {void}
         */
        var reset = function reset(el) {
          var type = el.prop('type');
          if (type == undefined) return;
          if (type == 'checkbox' || type == 'radio') {
            el.each(function (i, el) {
              var $this = $(this);
              $this.prop('checked', $this.prop('defaultChecked'));
            });
          } else if (type.startsWith('select')) {
            el.find('option').each(function (i, el) {
              var $this = $(this);
              $this.prop('selected', $this.prop('defaultSelected'));
            });
          } else {
            el.val(el.prop("defaultValue"));
          }
          el.trigger('change');
        };

        /**
         * Scroll viewport to the first error message position
         * @param  {int} animDuration
         * @return void
         */
        var scrollToFirstError = function scrollToFirstError(animDuration) {
          var errorSetting = form['settings']['layout']['errorMessagePlacement'];
          if (errorSetting && errorSetting != 'stackToBottom') {
            var firstError = $theForm.find('.ff-el-is-error').first();
            if (firstError.length && !isElementInViewport(firstError[0])) {
              $('html, body').delay(animDuration).animate({
                scrollTop: firstError.offset().top - (!!$('#wpadminbar') ? 32 : 0) - 20
              }, animDuration);
            }
          }
        };

        /**
         * Show error if element is out of viewport
         * @param  {HTMLElement} el
         * @return {Boolean}
         */
        var isElementInViewport = function isElementInViewport(el) {
          if (!el) {
            return true;
          }
          var rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.left >= 0 && rect.bottom <= $(window).height() && rect.right <= $(window).width();
        };

        /**
         * Validate inputs
         *
         * @param  elements jQueryObject target
         * @return void
         * @throes error
         */
        var validate = function validate(elements) {
          if (!elements.length) {
            elements = $('.frm-fluent-form').find(':input').not(':button').filter(function (i, el) {
              return !$(el).closest('.has-conditions').hasClass('ff_excluded');
            });
          }
          elements.each(function (i, el) {
            $(el).closest('.ff-el-group').removeClass('ff-el-is-error').find('.error').remove();
          });
          validator().validate(elements, form.rules);
        };
        var addFieldValidationRule = function addFieldValidationRule(elName, ruleName, rule) {
          if (!form.rules[elName]) {
            form.rules[elName] = {};
          }
          form.rules[elName][ruleName] = rule;
        };
        var removeFieldValidationRule = function removeFieldValidationRule(elName, ruleName) {
          if (!(elName in form.rules)) {
            return;
          }
          if (ruleName in form.rules[elName]) {
            delete form.rules[elName][ruleName];
          }
        };

        /**
         * Show form validation errors
         * @param  {object} errors
         * @return void
         */
        var showErrorMessages = function showErrorMessages(errors) {
          var errorStack = $theForm.parent().find('.ff-errors-in-stack');
          errorStack.empty();
          if (!errors) {
            return;
          }
          if (typeof errors == 'string') {
            showErrorInStack({
              'error': [errors]
            });
            return;
          }
          var errorSetting = form['settings']['layout']['errorMessagePlacement'];
          if (!errorSetting || errorSetting == 'stackToBottom') {
            showErrorInStack(errors);
            return false;
          }
          $theForm.find('.error').empty();
          $theForm.find('.ff-el-group').removeClass('ff-el-is-error');
          $.each(errors, function (element, messages) {
            if (typeof messages == 'string') {
              messages = [messages];
            }
            $.each(messages, function (rule, message) {
              showErrorBelowElement(element, message);
            });
          });
        };

        /**
         * Show validation errors all in a stack
         * @param  {object} errors
         * @return void
         */
        var showErrorInStack = function showErrorInStack(errors) {
          var $theForm = getTheForm();
          var errorStack = $theForm.parent().find('.ff-errors-in-stack');
          if (!errors) {
            return;
          }
          if ($.isEmptyObject(errors)) {
            return;
          }
          $.each(errors, function (elementName, errorObject) {
            if (typeof errorObject == 'string') {
              errorObject = [errorObject];
            }
            $.each(errorObject, function (index, errorString) {
              var errorHtml = $('<div/>', {
                'class': 'error text-danger'
              });
              var cross = $('<span/>', {
                "class": 'error-clear',
                html: '&times;'
              });
              var text = $('<span/>', {
                "class": 'error-text',
                'data-name': getElement(elementName).attr('name'),
                html: errorString
              });
              errorHtml.attr('role', 'alert');
              errorHtml.append(text, cross);
              errorStack.append(errorHtml).show();
            });
            var element = getElement(elementName);
            if (element) {
              var name = element.attr('name');
              element.attr('aria-invalid', 'true');
              var el = $('[name=\'' + name + '\']').first();
              if (el) {
                el.closest('.ff-el-group').addClass('ff-el-is-error');
              }
            }
          });
          if (!isElementInViewport(errorStack[0])) {
            $('html, body').animate({
              scrollTop: errorStack.offset().top - 100
            }, 350);
          }
          errorStack.on('click', '.error-clear', function () {
            $(this).closest('div').remove();
            errorStack.hide();
          }).on('click', '.error-text', function () {
            var el = $("[name='".concat($(this).data('name'), "']")).first();
            $('html, body').animate({
              scrollTop: el.offset() && el.offset().top - 100
            }, 350, function (_) {
              return el.focus();
            });
          });
        };

        /**
         * Show validation error/message beside the element
         * @param  {string} element
         * @param  {string} message
         * @return void
         */
        var showErrorBelowElement = function showErrorBelowElement(element, message) {
          var el, div;
          el = getElement(element);
          if (!el.length) {
            showErrorInStack([message]);
            return;
          }
          el.attr('aria-invalid', 'true');
          div = $('<div/>', {
            "class": 'error text-danger'
          });
          div.attr('role', 'alert');
          el.closest('.ff-el-group').addClass('ff-el-is-error');
          if (el.closest('.ff-el-input--content').length) {
            el.closest('.ff-el-input--content').find('div.error').remove();
            el.closest('.ff-el-input--content').append(div.text(message));
          } else {
            el.find('div.error').remove();
            el.append(div.text(message));
          }
        };
        var initInlineErrorItems = function initInlineErrorItems() {
          $theForm.find('.ff-el-group,.ff_repeater_table').on('change', 'input,select,textarea', function () {
            if (window.ff_disable_error_clear) {
              return;
            }
            $(this).attr('aria-invalid', 'false');
            var errorSetting = form['settings']['layout']['errorMessagePlacement'];
            if (errorSetting || errorSetting != 'stackToBottom') {
              var $parent = $(this).closest('.ff-el-group');
              if ($parent.hasClass('ff-el-is-error')) {
                $parent.removeClass('ff-el-is-error').find('.error.text-danger').remove();
              }
            }
          });
        };

        /**
         * Resolve a dom element as jQuery object
         *
         * @param  string name
         * @return jQuery instance
         */
        var getElement = function getElement(name) {
          var $theForm = getTheForm();
          var el = $("[data-name='" + name + "']", $theForm);
          el = el.length ? el : $("[name='" + name + "']", $theForm);
          return el.length ? el : $("[name='" + name + "[]']", $theForm);
        };
        var reinitExtras = function reinitExtras() {
          if ($theForm.find('.ff-el-recaptcha.g-recaptcha').length) {
            var $el = $theForm.find('.ff-el-recaptcha.g-recaptcha');
            var siteKey = $el.data('sitekey');
            var id = $el.attr('id');
            grecaptcha.render(document.getElementById(id), {
              'sitekey': siteKey
            });
          }
          if ($theForm.find('.ff-el-turnstile.cf-turnstile').length) {
            var $el = $theForm.find('.ff-el-turnstile.cf-turnstile');
            var siteKey = $el.data('sitekey');
            var id = $el.attr('id');
            console.log(id);
            turnstile.render(document.getElementById(id), {
              'sitekey': siteKey
            });
          }
        };
        var initTriggers = function initTriggers() {
          $theForm = getTheForm();
          jQuery(document.body).trigger('fluentform_init', [$theForm, form]);
          jQuery(document.body).trigger('fluentform_init_' + form.id, [$theForm, form]);
          $theForm.trigger('fluentform_init_single', [this, form]);
          $theForm.find('input.ff-el-form-control').on('keypress', function (e) {
            return e.which !== 13;
          });
          $theForm.data('is_initialized', 'yes');
          $theForm.find('.ff-el-tooltip').on('mouseenter', function (event) {
            var content = $(this).data('content');
            var $popContent = $('.ff-el-pop-content');
            if (!$popContent.length) {
              $('<div/>', {
                "class": 'ff-el-pop-content'
              }).appendTo(document.body);
              $popContent = $('.ff-el-pop-content');
            }
            $popContent.html(content);
            var formWidth = $theForm.innerWidth() - 20;
            $popContent.css('max-width', formWidth);
            var iconLeft = $(this).offset().left;
            var contentWidth = $popContent.outerWidth();
            var contentHeight = $popContent.outerHeight();
            var tipLeftPosition = iconLeft - contentWidth / 2 + 10;
            if (tipLeftPosition < 15) {
              tipLeftPosition = 15;
            }
            $popContent.css('top', $(this).offset().top - contentHeight - 5);
            $popContent.css('left', tipLeftPosition);
          });
          $theForm.find('.ff-el-tooltip').on('mouseleave', function () {
            $('.ff-el-pop-content').remove();
          });
        };
        var addGlobalValidator = function addGlobalValidator(key, callback) {
          globalValidators[key] = callback;
        };
        var addHiddenData = function addHiddenData(items) {
          jQuery.each(items, function (itemName, itemValue) {
            if (itemValue) {
              var $itemDom = $theForm.find('input[name=' + itemName + ']');
              if ($itemDom.length) {
                $itemDom.attr('value', itemValue);
              } else {
                $('<input>').attr({
                  type: 'hidden',
                  name: itemName,
                  value: itemValue
                }).appendTo($theForm);
              }
            }
          });
        };
        var appInstance = {
          initFormHandlers: initFormHandlers,
          registerFormSubmissionHandler: registerFormSubmissionHandler,
          maybeInlineForm: maybeInlineForm,
          reinitExtras: reinitExtras,
          initTriggers: initTriggers,
          validate: validate,
          showErrorMessages: showErrorMessages,
          scrollToFirstError: scrollToFirstError,
          settings: form,
          formSelector: formSelector,
          sendData: sendData,
          addGlobalValidator: addGlobalValidator,
          config: form,
          showFormSubmissionProgress: showFormSubmissionProgress,
          addFieldValidationRule: addFieldValidationRule,
          removeFieldValidationRule: removeFieldValidationRule,
          hideFormSubmissionProgress: hideFormSubmissionProgress
        };
        fluentFormAppStore[formInstanceSelector] = appInstance;
        return appInstance;
      }(validationFactory);
    };
    var fluentFormCommonActions = {
      init: function init() {
        var _this = this;
        setTimeout(function () {
          _this.initMultiSelect();
        }, 100);
        this.initMask();
        this.initNumericFormat();
        this.initCheckableActive();
      },
      /**
       * Init choice2
       *
       * @return void
       */
      initMultiSelect: function initMultiSelect() {
        // Loads if function exists.
        if (!$.isFunction(window.Choices)) {
          return;
        }
        if (!$('.ff_has_multi_select').length) {
          return;
        }
        $('.ff_has_multi_select').each(function (idx, el) {
          var choiceArgs = {
            removeItemButton: true,
            silent: true,
            shouldSort: false,
            searchEnabled: true,
            searchResultLimit: 50
          };
          var args = _objectSpread(_objectSpread({}, choiceArgs), window.fluentFormVars.choice_js_vars);
          var maxSelection = $(el).attr('data-max_selected_options');
          if (parseInt(maxSelection)) {
            args.maxItemCount = parseInt(maxSelection);
            args.maxItemText = function (maxItemCount) {
              var message = window.fluentFormVars.choice_js_vars.maxItemText;
              message = message.replace('%%maxItemCount%%', maxItemCount);
              return message;
            };
          }
          args.callbackOnCreateTemplates = function () {
            var self = this,
              $element = $(self.passedElement.element);
            return {
              // Change default template for option.
              option: function option(item) {
                var opt = Choices.defaults.templates.option.call(this, item);
                if (item.customProperties) {
                  opt.dataset.calc_value = item.customProperties;
                }
                return opt;
              }
            };
          };

          // Save choicesjs instance for future access.
          $(el).data('choicesjs', new Choices(el, args));
        });
      },
      /**
       * Init jQuery mask plugin
       *
       * @return void
       */
      initMask: function initMask() {
        if (jQuery.fn.mask == undefined) {
          return;
        }
        var globalOptions = {
          clearIfNotMatch: window.fluentFormVars.input_mask_vars.clearIfNotMatch,
          translation: {
            '*': {
              pattern: /[0-9a-zA-Z]/
            },
            '0': {
              pattern: /\d/
            },
            '9': {
              pattern: /\d/,
              optional: true
            },
            '#': {
              pattern: /\d/,
              recursive: true
            },
            'A': {
              pattern: /[a-zA-Z0-9]/
            },
            'S': {
              pattern: /[a-zA-Z]/
            }
          }
        };
        jQuery('input[data-mask]').each(function (key, el) {
          var el = jQuery(el),
            mask = el.attr('data-mask');
          var options = globalOptions;
          if (el.attr('data-mask-reverse')) {
            options.reverse = true;
          }
          if (el.attr('data-clear-if-not-match')) {
            options.clearIfNotMatch = true;
          }
          if (mask) {
            el.mask(mask, options);
          }
        });
      },
      initCheckableActive: function initCheckableActive() {
        $(document).on('change', '.ff-el-form-check input[type=radio]', function () {
          if ($(this).is(':checked')) {
            $(this).closest('.ff-el-input--content').find('.ff-el-form-check').removeClass('ff_item_selected');
            $(this).closest('.ff-el-form-check').addClass('ff_item_selected');
          }
        });
        $(document).on('change', '.ff-el-form-check input[type=checkbox]', function () {
          if ($(this).is(':checked')) {
            $(this).closest('.ff-el-form-check').addClass('ff_item_selected');
          } else {
            $(this).closest('.ff-el-form-check').removeClass('ff_item_selected');
          }
        });
      },
      initNumericFormat: function initNumericFormat() {
        var numericFields = $('.frm-fluent-form .ff_numeric');
        $.each(numericFields, function (index, field) {
          var $field = $(field);
          var formatConfig = JSON.parse($field.attr('data-formatter'));
          if ($field.val()) {
            $field.val(window.ff_helper.formatCurrency($field, $field.val()));
          }
          $field.on('blur change', function () {
            var value = currency($(this).val(), formatConfig).format();
            $(this).val(value);
          });
        });
      }
    };

    /**
     * Validation factory
     * @return Validator Object
     */
    var validationFactory = function validationFactory() {
      /**
       * Validator
       */
      return new function () {
        /**
         * Store validation errors
         * @type {Object}
         */
        this.errors = {};

        /**
         * Validate all given elements using given rules
         * @param  {jQuery elements} elements
         * @param  {object} rules
         * @return void
         * @throws Error
         */
        this.validate = function (elements, rules) {
          var self = this,
            isValid = true,
            el,
            elName;
          elements.each(function (index, element) {
            el = $(element);
            elName = el.prop('name').replace('[]', '');
            if (el.data('type') === 'repeater_item') {
              elName = el.attr('data-name');
              rules[elName] = rules[el.data('error_index')];
            }
            if (rules[elName]) {
              $.each(rules[elName], function (ruleName, rule) {
                if (ruleName in self) {
                  if (!self[ruleName](el, rule)) {
                    isValid = false;
                    if (!(elName in self.errors)) {
                      self.errors[elName] = {};
                    }
                    self.errors[elName][ruleName] = rule.message;
                  }
                } else {
                  // throw new Error('Method [' + ruleName + '] doesn\'t exist in Validator.');
                }
              });
            }
          });
          !isValid && this.throwValidationException();
        };

        /**
         * Throw the validation exception
         * @return void
         * @throws ffValidationError
         */
        this.throwValidationException = function () {
          var error = new ffValidationError('Validation Error!');
          error.messages = this.errors;
          throw error;
        };

        /**
         * Declare handlers for available validation rules
         */

        /**
         * Handle required rule
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.required = function (el, rule) {
          if (!rule.value) return true;
          var type = el.prop('type');
          if (type == 'checkbox' || type == 'radio') {
            if (el.parents('.ff-el-group').attr('data-name')) {
              if (!rule.per_row) {
                return el.parents('.ff-el-group').find('input:checked').length;
              }
            }
            return $('[name="' + el.prop('name') + '"]:checked').length;
          } else if (type.startsWith('select')) {
            var selected = el.find(':selected');
            return !!(selected.length && selected.val().length);
          } else if (type == 'file') {
            return el.closest('div').find('.ff-uploaded-list').find('.ff-upload-preview[data-src]').length;
          } else {
            //solution for range slider required
            if (el.attr('is-changed') == 'false') {
              return '';
            }
            return String($.trim(el.val())).length;
          }
        };

        /**
         * Handle url rule (check valid url)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.url = function (el, rule) {
          var val = el.val();
          if (!rule.value || !val.length) return true;
          var urlregex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlregex.test(val);
        };

        /**
         * Handle email rule (check valid email)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.email = function validateEmail(el, rule) {
          var val = el.val();
          if (!rule.value || !val.length) return true;
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(val.toLowerCase());
        };

        /**
         * Handle numeric rule (check valid number)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.numeric = function (el, rule) {
          var val = window.ff_helper.numericVal(el);
          val = val.toString();
          if (!rule.value || !val) {
            return true;
          }
          return $.isNumeric(val);
        };

        /**
         * Handle minimum value rule (check valid number in min range)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.min = function (el, rule) {
          if (!el.val()) {
            return true;
          }
          var val = window.ff_helper.numericVal(el);
          val = val.toString();
          if (!rule.value || !val.length) {
            return true;
          }
          if (this.numeric(el, rule)) {
            return Number(val) >= Number(rule.value);
          }
        };

        /**
         * Handle maximum value rule (check valid number in max range)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.max = function (el, rule) {
          if (!el.val()) {
            return true;
          }
          var val = window.ff_helper.numericVal(el);
          val = val.toString();
          if (!rule.value || !val.length) {
            return true;
          }
          if (this.numeric(el, rule)) {
            return Number(val) <= Number(rule.value);
          }
        };

        /**
         * Validates if number of digits matches
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.digits = function (el, rule) {
          if (!el.val()) {
            return true;
          }
          var val = window.ff_helper.numericVal(el);
          val = val.toString();
          if (!rule.value || !val.length) {
            return true;
          }
          return this.numeric(el, rule) && val.length == rule.value;
        };
        this.max_file_size = function () {
          return true;
        };
        this.max_file_count = function () {
          return true;
        };
        this.allowed_file_types = function () {
          return true;
        };
        this.allowed_image_types = function () {
          return true;
        };

        /**
         * Validates for force failed
         *
         * @return true
         */
        this.force_failed = function () {
          return false;
        };

        /**
         * Handle valid_phone_number rule (check valid phone)
         * @param  jQuery Elelemnt el
         * @return bool
         */
        this.valid_phone_number = function (el, rule) {
          var val = el.val();
          if (!val) {
            return true;
          }
          if (typeof window.intlTelInputGlobals == 'undefined') {
            return true;
          }
          if (!el || !el[0]) {
            return;
          }
          var iti = window.intlTelInputGlobals.getInstance(el[0]);
          if (!iti) {
            return true;
          }
          if (el.hasClass('ff_el_with_extended_validation')) {
            var isValid = iti.isValidNumber();
            if (isValid) {
              el.val(iti.getNumber());
              return true;
            } else {
              return false;
            }
          } else {
            var selectedCountry = iti.getSelectedCountryData();
            var inputNumber = el.val();
            if (!el.attr('data-original_val') && inputNumber) {
              if (selectedCountry && selectedCountry.dialCode) {
                el.val('+' + selectedCountry.dialCode + inputNumber);
                el.attr('data-original_val', inputNumber);
              }
            }
          }
          return true;
        };
      }();
    };
    var $allForms = $('.frm-fluent-form');
    function initSingleForm($theForm) {
      var formInstance = fluentFormApp($theForm);
      if (formInstance) {
        formInstance.initFormHandlers();
        formInstance.initTriggers();
      } else {
        // If form instance is not loaded yet. We are looping into it
        var counter = 0;
        var i = setInterval(function () {
          formInstance = fluentFormApp($theForm);
          if (formInstance) {
            clearInterval(i);
            formInstance.initFormHandlers();
            formInstance.initTriggers();
          }
          counter++;
          if (counter > 10) {
            clearInterval(i);
            console.log('Form could not be loaded');
          }
        }, 1000);
      }
    }
    $.each($allForms, function (formIndex, formItem) {
      /**
       * Current form
       * @type jQuery object
       */
      initSingleForm($(formItem));
    });
    $(document).on('ff_reinit', function (e, formItem) {
      var $theForm = $(formItem);
      var formInstance = fluentFormApp($theForm);
      if (!formInstance) {
        return false;
      }
      formInstance.reinitExtras();
      if (window.hcaptcha) {
        hcaptcha.reset(); //two recapthca on same page creates conflicts
      }
      initSingleForm($theForm);
      fluentFormCommonActions.init();
      $theForm.attr('data-ff_reinit', 'yes');
    });
    fluentFormCommonActions.init();
  })(window.fluentFormVars, jQuery);
  jQuery('.fluentform').on('submit', '.ff-form-loading', function (e) {
    e.preventDefault();
    jQuery(this).parent().find('.ff_msg_temp').remove();
    jQuery('<div/>', {
      'class': 'error text-danger ff_msg_temp'
    }).html('Javascript handler could not be loaded. Form submission has been failed. Reload the page and try again').insertAfter(jQuery(this));
  });
});
/******/ })()
;
//# sourceMappingURL=form-submission.js.map