/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*******************************************************!*\
  !*** ./resources/assets/public/form-save-progress.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pro_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pro/slider */ "./resources/assets/public/Pro/slider.js");

(function ($) {
  $(document.body).on('fluentform_init', function (e, $theForm, form) {
    var formSelector = '.' + form.form_instance;
    var hash = -1;
    var activeStep = 'no';
    var hasSaveProgress = $(formSelector).hasClass('ff-form-has-save-progress');
    if (!hasSaveProgress) {
      return;
    }
    var hasFormStep = $(formSelector).hasClass('ff-form-has-steps');
    if (hasFormStep) {
      $theForm.on('ff_to_next_page', function (e, currentStep) {
        activeStep = currentStep;
      });
      $theForm.on('ff_to_prev_page', function (e, currentStep) {
        activeStep = currentStep;
      });
    }
    $(formSelector).find('.ff-btn-save-progress').each(function (key, el) {
      var $saveBttn = $(el);
      $saveBttn.on('click', function (e) {
        var _this = this;
        e.preventDefault();
        $saveBttn.addClass('ff-working');
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
          source_url: window.form_state_save_vars.source_url,
          action: 'fluentform_save_form_progress_with_link',
          data: inputData,
          form_id: $theForm.data('form_id'),
          hash: hash,
          active_step: activeStep,
          nonce: window.form_state_save_vars.nonce
        };
        var saveProgressMessage = formData.form_id + '_save_progress_msg';
        var savingResponseMsg = '#' + saveProgressMessage;
        jQuery.post(fluentFormVars.ajaxUrl, formData).then(function (data) {
          if (data) {
            var _data$data;
            hash = data.data.hash;
            var $linkDom = $theForm.find('.ff-saved-state-link');
            if (((_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.message) != '') {
              if ($(savingResponseMsg).length) {
                $(savingResponseMsg).slideUp('fast');
              }
              $('<div/>', {
                'id': saveProgressMessage,
                'class': 'ff-message-success ff-el-group'
              }).html(data.data.message).insertBefore($saveBttn.closest('.ff-el-group'));
            }

            //Show Link in Input
            var copyIcon = window.form_state_save_vars.copy_button || 'Copy';
            var inputDiv = "<div class=\"ff-el-input--content\">\n                                <div class=\"ff_input-group\">\n                                    <input readonly value=\"".concat(data.data.saved_url, "\" class=\"ff-el-form-control\" >\n                                    <div class=\"ff_input-group-append\">\n                                        <button class=\"ff-btn ff-btn-md ff_btn_style ff_btn_copy_link ff_input-group-text\">").concat(copyIcon, "</button>\n                                    </div>\n                                </div>\n                            </div>");
            var inputGroup = $('<div/>', {
              "class": 'ff-el-group ff-saved-state-input ff-saved-state-link ff-hide-group',
              html: inputDiv
            });
            $(_this).closest('.ff-el-group').after(inputGroup);
            inputGroup.fadeIn();

            //Show Email Input
            var emailPlaceholderStr = window.form_state_save_vars.email_placeholder_str || 'Your Email Here';
            var emailIcon = window.form_state_save_vars.email_button || 'Email';
            if ($(_this).hasClass('ff_resume_email_enabled')) {
              var emailDiv = "<div class=\"ff-el-input--content\">\n                                    <div class=\"ff_input-group\">\n                                        <input type=\"email\" class=\"ff-el-form-control\" placeholder=\"".concat(emailPlaceholderStr, "\" class=\"ff-el-form-control\">\n                                        <div class=\"ff_input-group-append\">\n                                            <button class=\"ff-btn ff-btn-md ff_btn_style ff_btn_is_email ff_input-group-text\">").concat(emailIcon, "</button>\n                                        </div>\n                                    </div>\n                                </div>");
              var emailGroup = $('<div/>', {
                "class": 'ff-el-group ff-saved-state-input  ff-email-address ff-hide-group',
                html: emailDiv
              });
              $(inputGroup).after(emailGroup);
              emailGroup.fadeIn();
            }
          }
        }).fail(function (error) {
          if ($(savingResponseMsg).length) {
            $(savingResponseMsg).slideUp('fast');
          }
          $('<div/>', {
            'id': saveProgressMessage,
            'class': 'ff-message-success ff-el-group text-danger'
          }).html(error.responseJSON.data.message).insertBefore($saveBttn.closest('.ff-el-group'));
        }).always(function () {
          $saveBttn.parent().hide();
        });
      });
    });
    $(formSelector).on('click', '.ff_btn_copy_link', function (e) {
      e.preventDefault();
      var copiedText = $(this).closest('.ff-el-input--content').find('.ff-el-form-control').val();
      navigator.clipboard.writeText(copiedText);
      var copySuccess = window.form_state_save_vars.copy_success_button || 'Copied';
      $(this).html("".concat(copySuccess));
    });
    $(formSelector).on('click', '.ff_btn_is_email', function (e) {
      e.preventDefault();
      var emailBtn = $(this).closest('.ff-el-group');
      var to_email = $(this).closest('.ff-email-address').find('input').val();
      $('.ff-email-address').find('input').val('');
      var link = $('.ff-saved-state-link').find('input').val();
      var formData = {
        source_url: window.form_state_save_vars.source_url,
        action: 'fluentform_email_progress_link',
        form_id: $theForm.data('form_id'),
        to_email: to_email,
        link: link,
        hash: hash,
        nonce: window.form_state_save_vars.nonce
      };
      var emailResponse = formData.form_id + '_save_progress_email_response';
      var responseMessageSelector = '#' + emailResponse;
      jQuery.post(fluentFormVars.ajaxUrl, formData).then(function (data) {
        if (data) {
          emailBtn.removeClass('ff-el-is-error');
          if ($(responseMessageSelector).length) {
            $(responseMessageSelector).slideUp('fast');
          }
          $('<div/>', {
            'id': emailResponse,
            'class': 'ff-message-success ff-el-group'
          }).html(data.data.response).insertAfter(emailBtn);
        }
      }).fail(function (error) {
        if (error) {
          emailBtn.addClass('ff-el-is-error');
          if ($(responseMessageSelector).length) {
            $(responseMessageSelector).slideUp('fast');
          }
          $('<div/>', {
            'id': emailResponse,
            'class': 'ff-message-success ff-el-group text-danger'
          }).html(error.responseJSON.data.Error).insertAfter(emailBtn);
        }
      });
    });

    //load data
    var hashKey = false;
    if (typeof window.form_state_save_vars !== 'undefined') {
      hashKey = window.form_state_save_vars.key;
    }
    if (!hashKey) {
      return;
    }
    $theForm.append("<input type=\"hidden\" value=\"".concat(hashKey, "\" class=\"__fluent_state_hash\" name=\"__fluent_state_hash\"/>"));
    jQuery.getJSON(fluentFormVars.ajaxUrl, {
      form_id: $theForm.data('form_id'),
      action: 'fluentform_get_form_state',
      hash: hashKey,
      nonce: window.form_state_save_vars.nonce
    }).then(function (data) {
      if (data) {
        var sliderInstance = (0,_Pro_slider__WEBPACK_IMPORTED_MODULE_0__["default"])($, $theForm, window.fluentFormVars, formSelector);
        sliderInstance.populateFormDataAndSetActiveStep(data);
      }
    });
  });
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=form-save-progress.js.map