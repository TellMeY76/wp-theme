/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************************!*\
  !*** ./resources/assets/admin/admin_notices.js ***!
  \*************************************************/
var ffNoticeApp = {
  initNagButton: function initNagButton() {
    var $btn = jQuery('.ff_nag_cross');
    $btn.on('click', function (e) {
      e.preventDefault();
      var noticeName = jQuery(this).attr('data-notice_name');
      var noticeType = jQuery(this).attr('data-notice_type');
      jQuery('#ff_notice_' + noticeName).remove();
      var url = FluentFormsGlobal.$rest.route('noticeAction');
      FluentFormsGlobal.$rest.post(url, {
        notice_name: noticeName,
        action_type: noticeType
      }).then(function (response) {
        console.log(response);
      })["catch"](function (error) {
        console.log(error);
      });
    });
  },
  initTrackYes: function initTrackYes() {
    var $btn = jQuery('.ff_track_yes');
    $btn.on('click', function (e) {
      e.preventDefault();
      var noticeName = jQuery(this).attr('data-notice_name');
      var emailEnabled = 0;
      if (jQuery('#ff-optin-send-email').attr('checked')) {
        emailEnabled = 1;
      }
      jQuery('#ff_notice_' + noticeName).remove();
      FluentFormsGlobal.$post({
        action: 'fluentform_notice_action_track_yes',
        notice_name: noticeName,
        email_enabled: emailEnabled
      }).then(function (response) {
        console.log(response);
      }).fail(function (error) {
        console.log(error);
      });
    });
  },
  initSmtpInstall: function initSmtpInstall() {
    var $btn = jQuery('.intstall_fluentsmtp');
    $btn.on('click', function (e) {
      var _this = this;
      e.preventDefault();
      jQuery(this).attr('disabled', true);
      jQuery('.ff_addon_installing').show();
      FluentFormsGlobal.$post({
        action: 'fluentform_install_fluentsmtp'
      }).then(function (response) {
        $btn.text('Please wait....');
        if (response.is_installed && response.config_url) {
          window.location.href = response.config_url;
        } else if (response.is_installed) {
          location.reload();
        } else {
          alert('something is wrong when installing the plugin. Please install FluentSMTP manually.');
        }
        console.log(response);
      }).fail(function (error) {
        var message = 'something is wrong when installing the plugin. Please install FluentSMTP manually.';
        if (error.responseJSON && error.responseJSON.message) {
          message = error.responseJSON.message;
        }
        alert(message);
        console.log(error);
      }).always(function () {
        jQuery(_this).attr('disabled', false);
        jQuery('.ff_addon_installing').hide();
      });
    });
  },
  handleReviewQuery: function handleReviewQuery() {
    var $btn = jQuery('.ff_review_now');
    $btn.on('click', function (e) {
      e.preventDefault();
      jQuery(this).attr('disabled', true);
      var noticeName = jQuery(this).attr('data-notice_name');
      var route = FluentFormsGlobal.$rest.route('noticeAction');
      FluentFormsGlobal.$rest.post(route, {
        notice_name: noticeName
      }).then(function (response) {
        if (response) {
          $btn.html('Thank You! We Really appreciate it.').fadeIn();
          setTimeout(function () {
            var url = $btn.attr('href');
            jQuery('#ff_notice_' + noticeName).remove();
            window.open(url, '_blank');
          }, 1000);
        }
      })["catch"](function (error) {
        console.log(error);
      });
    });
  },
  initReady: function initReady() {
    var _this2 = this;
    jQuery(document).ready(function () {
      _this2.initNagButton();
      _this2.initTrackYes();
      _this2.initSmtpInstall();
      _this2.handleReviewQuery();
    });
  }
};
ffNoticeApp.initReady();
/******/ })()
;
//# sourceMappingURL=admin_notices.js.map