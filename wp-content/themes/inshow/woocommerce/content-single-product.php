<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined('ABSPATH') || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action('woocommerce_before_single_product');

if (post_password_required()) {
    echo get_the_password_form(); // WPCS: XSS ok.

    return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class('', $product); ?>>
    <div class="inshow-product-page row"> <!-- 添加 "row" 类以方便布局控制 -->
        <div class="product-gallery-col"> <!-- 添加新的类以控制宽度 -->
            <?php
            // 商品画廊
            do_action('woocommerce_before_single_product_summary');
            ?>
        </div>
        <div class="product-summary-col"> <!-- 商品信息栏，控制宽度 -->
            <?php
            // 商品标题、价格和详情摘要
            do_action('woocommerce_single_product_summary');
            ?>
        </div>
    </div> <!-- 结束row -->

    <!-- 商品描述和其他的tab页 -->
    <div class="product-description-and-tabs">
        <?php do_action('woocommerce_after_single_product_summary'); ?>
    </div>

    <?php
    /**
     * Hook: woocommerce_after_single_product.
     */
    do_action('woocommerce_after_single_product');

    echo <<<HTML
        <div id="chatNowModal" class="chat-now-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <form id="chatForm">
                    <h4 class="modal-title">Please enter your mailbox</h4>
                    <div class="chatForm-item">
                        <label>Email:</label>
                        <input type="email" id="userEmail" name="user_email" placeholder="Enter your email" required />
                     </div>
                    <div class="operation-btns">
                         <button type="submit" class="button submit-email">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    HTML;
    ?>
</div>
