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
 * @see     https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<div class="inshow-product-page">
		<div class="left-column">
			<div class="prod-cat-list">
				<p class="prod-cat-list_title"><b>Categories</b></p>
				<?php 
				// 输出产品分类
				$categories = get_the_terms( $post->ID, 'product_cat' );
				if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
					foreach ( $categories as $category ) {
						echo '<a href="' . esc_url( get_term_link( $category->term_id, 'product_cat' ) ) . '">' . esc_html( $category->name ) . '</a>';
					}
				}
				?>
			</div>
			<div class="prod-tag-list">
				<p class="prod-tag-list_title"><b>Tags</b></p>
				<?php 		
				// 输出产品标签
				$tags = get_the_terms( $post->ID, 'product_tag' );
				if ( ! empty( $tags ) && ! is_wp_error( $tags ) ) {
					foreach ( $tags as $tag ) {
						echo '<a>' . esc_html( $tag->name ) . '</a>';
					}
				}
				?>
			</div>
		</div>
  
		<div class="right-column">
			<?php

			// 商品画廊
			/**
			 * Hook: woocommerce_before_single_product_summary.
			 *
			 * @hooked woocommerce_show_product_sale_flash - 10
			 * @hooked woocommerce_show_product_images - 20
			 */
			do_action( 'woocommerce_before_single_product_summary' );
			
			// 商品标题、价格和详情摘要
			/**
			 * Hook: woocommerce_single_product_summary.
			 *
			 * @hooked woocommerce_template_single_title - 5
			 * @hooked woocommerce_template_single_rating - 10
			 * @hooked woocommerce_template_single_price - 10
			 * @hooked woocommerce_template_single_excerpt - 20
			 * @hooked woocommerce_template_single_add_to_cart - 30
			 * @hooked woocommerce_template_single_meta - 40
			 * @hooked woocommerce_template_single_sharing - 50
			 * @hooked WC_Structured_Data::generate_product_data() - 60
			 */
			do_action( 'woocommerce_single_product_summary' );
			
			/**
			 * Hook: woocommerce_after_single_product_summary.
			 *
			 * @hooked woocommerce_output_product_data_tabs - 10
			 * @hooked woocommerce_upsell_display - 15
			 * @hooked woocommerce_output_related_products - 20
	 	    */
			do_action( 'woocommerce_after_single_product_summary' );
			?>
		</div>
	</div>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
