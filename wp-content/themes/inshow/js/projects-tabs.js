jQuery(document).ready(function($) {
    const tabLinks = $('.project-tabs .tab-link');
    const projectItemsContainer = $('#projectItemsContainer'); // 假设项目容器有一个ID
    // 动画相关CSS类
    const fadeInClass = 'fadeIn';

    tabLinks.each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();

            // 移除所有活动链接的样式
            tabLinks.removeClass('active');
            $(this).addClass('active');
            projectItemsContainer.removeClass('initial-hide');
            // 发送AJAX请求使用$.ajax
            const categoryId = $(this).data('cat'); // 使用data属性来确定目标分类ID
            $.ajax({
                type: 'POST',
                url: ajax_object.ajaxurl,
                data: {
                    action: 'load_projects_by_category',
                    categoryId: categoryId,
                    _nonce: ajax_object.nonce
                },
                success: function(data) {
                    projectItemsContainer.hide().removeClass(fadeInClass);
                    // 使用响应数据更新项目容器内容
                    projectItemsContainer.html(data).hide().fadeIn(500); // 500ms是动画持续时间，可根据需要调整
                },
                error: function(error) {
                    console.error('Error fetching projects:', error);
                }
            });
        });
    });
});