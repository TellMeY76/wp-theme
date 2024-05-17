<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined('ABSPATH') || exit;

global $product;

// Ensure visibility.
if (empty($product) || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('', $product); ?>>
    <div class="list-product-layout">
        <?php
        // 商品链接
        $product_link = esc_url(get_permalink($product->get_id()));
        ?>

        <a href="<?php echo $product_link; ?>" class="custom-product-link">
            <div class="product-image">
                <?php do_action('woocommerce_before_shop_loop_item_title'); ?>
            </div>
            <div class="product-details">
                <?php
                // 商品标题
                do_action('woocommerce_shop_loop_item_title');
                ?>

                <?php
                // Display product description
                echo '<div class="product-description">' . wp_kses_post(wp_trim_words($product->get_description(), 20)) . '</div>';
                ?>
            </div>

            <div class="product-btns">
                <button class="product-btn detail">Details <i class="fa-solid fa-arrow-right-long"></i></button>
            </div>
        </a>
    </div>

    <?php
    // 移除购物车按钮
    remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
    ?>
</li>
