jQuery(document).ready(function ($) {
    $('.main-prod-block').hover(
        function() { // 鼠标移入
            var $hiddenContent = $(this).find('.main-prod-hidden-content');
            var height = $hiddenContent.outerHeight(true);
            $hiddenContent.css('display', 'block');
            $hiddenContent.hide(); // 确保动画可以执行
            $hiddenContent.slideDown(150); // 向下滑动显示
            $(this).find('.wp-block-stackable-heading').animate({marginTop: '-=' + height + 'px'}, 150); // 动画调整content位置
        },
        function() { // 鼠标移出
            var $hiddenContent = $(this).find('.main-prod-hidden-content');
            $(this).find('.wp-block-stackable-heading').animate({marginTop: '0'}, 150, function() { // 恢复content位置
                $hiddenContent.slideUp(150, function() { // 向上滑动隐藏
                    $hiddenContent.css('display', 'none'); // 隐藏后重置display
                });
            });
        }
    );
})

