function showMessage(message, isError = false) {
    const messageBox = jQuery("#messageBox");
    messageBox.text(message);
    if (isError) {
        messageBox.addClass('error');
    } else {
        messageBox.removeClass('error');
    }
    messageBox.fadeIn();

    // 消息3秒后自动消失
    setTimeout(function() {
        messageBox.fadeOut();
    }, 3000);
}

jQuery(document).ready(function($) {
    // 初始化提示框
    if ($("#messageBox").length === 0) {
        $("body").append('<div id="messageBox"></div>');
    }
});
