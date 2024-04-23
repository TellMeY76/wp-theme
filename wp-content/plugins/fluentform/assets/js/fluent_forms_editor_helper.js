/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************************!*\
  !*** ./resources/assets/admin/fluent_forms_editor_helper.js ***!
  \**************************************************************/
function initFFPreviewHelper($) {
  var $previewBody = $('.ff_preview_body');
  var $previewText = $('.ff_preview_text');
  var $formPreviewStyleToggle = $('.ff_form_preview_style_toggle');
  var isPreviewOnly = window.localStorage.getItem('ff_preview_only');
  if (isPreviewOnly == 'true') {
    $previewBody.addClass('ff_preview_only');
    $("#ff_preview_only").attr("checked", true);
  }
  var screenType = window.localStorage.getItem('ff_window_type');
  screenChange(screenType, $);
  $('body').on('click', '.ff_device_control', function () {
    var screenType = $(this).data('type');
    window.localStorage.setItem('ff_window_type', screenType);
    screenChange(screenType, $);
  });
  $('#ff_preview_only').on('change', function () {
    var isChecked = $(this).is(':checked');
    $previewBody.toggleClass('ff_preview_only', isChecked);
    $previewText.html(isChecked ? 'Preview Mode' : 'Design Mode');
    $formPreviewStyleToggle.toggle(!isChecked);
    window.localStorage.setItem('ff_preview_only', isChecked);
    $('body').find('form.frm-fluent-form').trigger('fluentform-preview-mode-change', isChecked);
  });
  var alertElem = $("\n    <div role=\"alert\" class=\"el-notification right\" style=\"bottom: 16px; z-index: 999999;\">\n      <i class=\"el-notification__icon el-icon-success\"></i>\n      <div class=\"el-notification__group is-with-icon\">\n        <h2 class=\"el-notification__title\">Success</h2>\n        <div class=\"el-notification__content\">\n          <p>Copied to Clipboard.</p>\n        </div>\n      </div>\n    </div>\n  ");
  var copyToggle = $("#copy-toggle");
  var copy = $('#copy');
  var body = $("body");
  copyToggle.on('click', function () {
    var copyText = copy.text();
    var temp = $("<input>");
    body.append(temp);
    temp.val(copyText.trim()).select();
    document.execCommand("copy");
    temp.remove();
    body.append(alertElem);
    setTimeout(function () {
      alertElem.remove();
    }, 2000);
  });
  $('.ff_form_preview_wrapper .fluentform').on('click', function (e) {
    $elm = $(e.target);
    var islabel = $elm.parent().hasClass('ff-el-input--label');
    var isInput = $elm.hasClass('ff-el-form-control');
    var isCheckable = $elm.parent().hasClass('ff-el-form-check-label');
    var isSubmitBtn = $elm.hasClass('ff-btn-submit');
    var isSectionBreak = $elm.parent().hasClass('ff-el-section-break') || $elm.parent().hasClass('ff-custom_html');
    var type = '';
    if (islabel) {
      type = 'label';
    } else if (isInput) {
      type = 'input';
    } else if (isCheckable) {
      type = 'checkable';
    } else if (isSectionBreak) {
      type = 'sectionBrk';
    }
    if (type != '') {
      window.dispatchEvent(new CustomEvent("selectionFired", {
        "detail": {
          'type': type
        }
      }));
    }
  });
}
function screenChange() {
  var screenType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'monitor';
  var $ = arguments.length > 1 ? arguments[1] : undefined;
  var mobile = '375px';
  var tablet = '768px';
  var monitor = '100%';
  var $wrapper = $('.ff_form_preview_wrapper');
  var screenTypes = ['mobile', 'tablet', 'monitor'];
  var screenTypeClasses = screenTypes.join(' ');
  $wrapper.removeClass(screenTypeClasses).addClass(screenType);
  $('.frm-fluent-form .ff-t-container').removeClass(screenTypeClasses).addClass(screenType);
  $('.ff_device_control').removeClass('active');
  $('*[data-type="' + screenType + '"]').addClass('active');
  var width = monitor;
  if (screenType === 'tablet') {
    width = tablet;
  } else if (screenType === 'mobile') {
    width = mobile;
  }
  $wrapper.animate({
    width: width
  });
  $('body').find('form').trigger('screen-change', [width, screenType, screenTypes]);
}
jQuery(document).ready(function () {
  var $ = jQuery.noConflict();
  initFFPreviewHelper($);
});
/******/ })()
;
//# sourceMappingURL=fluent_forms_editor_helper.js.map