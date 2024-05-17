<?php
/**
 * Displayed when no products are found matching the current query
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/loop/no-products-found.php.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.8.0
 */

defined( 'ABSPATH' ) || exit;

?>
<div class="woocommerce-no-products-found">
    <div class="no-results-message">
        <!-- 添加图片 -->
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/product-list/no_results.png" alt="<?php esc_attr_e( 'No products found', 'woocommerce' ); ?>" class="no-products-image">

        <!-- 修改并美化文字 -->
        <div class="message-wrapper">
            <h3>No Results</h3>
        </div>
    </div>
</div>
