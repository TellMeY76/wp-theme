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

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>
<li <?php wc_product_class( '', $product ); ?>>
	<div class="custom-product-layout">
		<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>" class="custom-product-link">
			<!-- 将产品图片移到右侧 -->
			<div class="product-image">
				<?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
			</div>

			<!-- 产品标题和价格区域变为左侧 -->
			<div class="product-details">
				<?php do_action( 'woocommerce_shop_loop_item_title' ); ?>

				<?php do_action( 'woocommerce_after_shop_loop_item_title' ); ?>
			</div>
		</a>
	</div>

	<?php
	// 移除购物车按钮
	remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
	?>
</li>
