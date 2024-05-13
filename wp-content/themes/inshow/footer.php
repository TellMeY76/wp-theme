<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package InShow
 */

?>
	<footer id="colophon" class="site-footer">
		<div class="container">
			<div class="footer-columns">
				<?php if ( is_active_sidebar( 'footer_column_1' ) ) : ?>
					<div class="footer-column">
						<?php dynamic_sidebar( 'footer_column_1' ); ?>
						<!-- 添加自定义小工具 -->
						<?php if (is_active_widget(false, false, 'footer_info_widget', true)) : ?>
							<?php dynamic_sidebar('footer_info'); ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>
				<?php if ( is_active_sidebar( 'footer_column_2' ) ) : ?>
					<div class="footer-column">
						<?php dynamic_sidebar( 'footer_column_2' ); ?>
						<div class="social-icons">
							<span><a href="https://www.facebook.com/example" target="_blank"><i class="fab fa-facebook"></i></a></span>
							<span><a href="https://twitter.com/example" target="_blank"><i class="fab fa-twitter"></i></a></span>
							<span><a href="https://www.instagram.com/example" target="_blank"><i class="fab fa-instagram"></i></a></span>
            			<!-- 更多社交媒体平台的链接 -->
        				</div>
					</div>
				<?php endif; ?>
				<?php if ( is_active_sidebar( 'footer_column_3' ) ) : ?>
					<div class="footer-column">
						<?php dynamic_sidebar( 'footer_column_3' ); ?>
					</div>
				<?php endif; ?>
				<?php if ( is_active_sidebar( 'footer_column_4' ) ) : ?>
					<div class="footer-column">
						<?php dynamic_sidebar( 'footer_column_4' ); ?>
					</div>
				<?php endif; ?>

			</div><!-- /.footer-columns -->

			<!-- 在四列布局之后添加版权信息 -->
			<div class="footer-copyright">
				<p>&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?>. All Rights Reserved.</p>
				<!-- 根据需要添加更多信息，例如隐私政策、条款链接等 -->
			</div>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

<script>
    jQuery(document).ready(function($) {
        $('.menu-item-has-children').hover(
            function() {
                $(this).find('.dropdown-content').show();
            },
            function() {
                $(this).find('.dropdown-content').hide();
            }
        );
    });
</script>

</body>
</html>
