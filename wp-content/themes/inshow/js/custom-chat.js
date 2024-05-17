jQuery(document).ready(function($){
    // 点击按钮打开模态框
    $("#chatNowBtn").click(function () {
        console.log('chatNowBtn click')
        $("#chatNowModal").show();
    });

    // 点击×关闭模态框
    $(".close").click(function() {
        $("#chatNowModal").hide();
    });

    // 点击模态框外区域也可以关闭模态框
    $(window).click(function(event) {
        if (event.target == document.getElementById('chatNowModal')) {
        $("#chatNowModal").hide();
     }
    });

    $('#chatForm').on('submit', function(e) {
        e.preventDefault();
        const userEmail = $('#userEmail').val();
        const productName = $('#chatNowBtn').data('product-name');

        // AJAX提交数据
        $.ajax({
            type: "POST",
            url: ajax_object.ajaxurl,
            data: {
                action: "save_chat_data",
                user_email: encodeURIComponent(userEmail),
                product_name: encodeURIComponent(productName)
            },
            success: function(response) {
                showMessage(response.data);
                $('#chatNowModal').hide();
                $('#chatForm')[0].reset();
            },
            error: function(xhr, status, error) {
                // 处理错误情况
                showMessage('An error occurred. Please try again.', true);
                console.error(error);
            }
        });
    });

    // 点击发送询问按钮，滚动到锚点
    // 点击发送询问按钮，滚动到锚点并垂直居中
    $("#sendInquiryBtn").click(function () {
        // 获取视口高度
        const windowHeight = $(window).height();
        // 获取元素高度
        const elementHeight = $("#prod-contact").outerHeight();
        // 计算滚动位置
        const scrollToPosition = $("#prod-contact").offset().top - (windowHeight - elementHeight) / 2;

        // 使用动画滚动到计算出的位置
        $('html, body').animate({
            scrollTop: scrollToPosition
        }, 1000);
    });
});

