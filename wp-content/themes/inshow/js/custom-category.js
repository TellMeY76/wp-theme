jQuery(document).ready(function ($) {
    // 点击没有子分类的分类项，跳转到对应的商品列表
    $('.category-item:not(.has-children)').on('click', function (e) {
        if ($(this).hasClass('has-children')) return; // 如果有子分类则不执行跳转
        console.log('href', $(this).data('href'))
        window.location.href = $(this).data('href'); // 使用data-href属性获取链接
    });

    // 初始化时如果URL中有指定分类，则自动展开该分类及其所有父分类
    var hash = window.location.hash.substring(1);

    var url = window.location.href;
    var pathParts = url.split('/');

    const currentCatName = pathParts[pathParts.length - 2];

    console.log('currentCatName', currentCatName)

    $('.category-item').each(function () {
        const categoryName = $(this).data('category-name');
        console.log('categoryName', categoryName)

        if (categoryName === currentCatName) {
            $(this).addClass('selected');
        }
    });

    if (hash) {
        var $target = $('[data-cat="' + hash + '"]');
        if ($target.length) {
            $target.parents('.category-item').addClass('expanded').find('> .subcategory-list').show();
        }
    }

    $('.category-header').click(function () {
        $(this).next('.subcategory-list').slideToggle(); // 切换当前子分类列表的显示状态
        $(this).parents('.category-item').siblings().find('.subcategory-list').slideUp(); // 关闭同级已展开的其他子分类列表
    });
});
