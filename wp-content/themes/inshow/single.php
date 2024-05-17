<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package InShow
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();
            // 判断是否为商品详情页，WooCommerce 示例
            get_template_part( 'template-parts/content', get_post_type() );
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
