jQuery(document).ready(function($) {

    // 假设dropdown-content是您的自定义Walker生成的部分
    const $dropdownContent = $('.dropdown-content');
    // 查找menu-search-block元素
    const $menuSearchBlock = $('.menu-search-block');

    // 确保这两个元素都存在再进行操作
    if ($dropdownContent.length && $menuSearchBlock.length) {
        // 将.dropdown-content插入到.menu-search-block内部
        $dropdownContent.appendTo($menuSearchBlock);
    }

    $('.menu-item-product').hover(
        function() {
            console.log('hover show');
            $dropdownContent.css("display", "flex");
        },
        function() {
            console.log('hover show');
            $dropdownContent.css("display", "none");
        },
    );
    $dropdownContent.hover(
        function() {
            $dropdownContent.css("display", "flex");
        },
        function() {
            $dropdownContent.css("display", "none");
        },
    );
});