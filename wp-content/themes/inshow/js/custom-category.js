jQuery(document).ready(function ($) {
    // 初始化时如果URL中有指定分类，则自动展开该分类及其所有父分类
    var hash = window.location.hash.substring(1);

    var url = window.location.href;
    var pathParts = url.split('/');

    const currentCatName = pathParts[pathParts.length - 2];

    $('.category-item').each(function () {
        const categoryName = $(this).data('category-name');
        if (categoryName === currentCatName || categoryName === decodeURI(currentCatName)) {
            $(this).addClass('selected');
        }
    });

    // 新增逻辑：如果子分类被选中，则展开该分类及其所有上级分类
    $('.category-item.selected').each(function () {
        var $parents = $(this).parents('.category-item');
        $parents.addBack().each(function () { // 使用addBack确保当前元素也在操作范围内
            $(this).addClass('selected');
            $(this).find('> .subcategory-list').show();
        });
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

    // 点击没有子分类的分类项，跳转到对应的商品列表
    $('.category-item').on('click', function (e) {
        var $this = $(this);
        var isSelected = $this.hasClass('selected');

        // 如果当前点击的是子分类（即有子分类的元素），处理父元素的 selected 状态
        if ($this.hasClass('has-children')) {
            $this.closest('.category-item').toggleClass('selected', !isSelected);
        }

        // 点击的元素自身 selected 状态切换
        $this.toggleClass('selected', !isSelected);

        // 如果该元素没有子分类且点击后已经是 selected 状态，执行跳转
        if (!isSelected && !$this.hasClass('has-children') && !$(this).find('.subcategory-list').length) {
            window.location.href = $this.data('href');
        }

        // 阻止事件冒泡，防止父元素的 click 事件被触发
        e.stopPropagation()
    });
});
