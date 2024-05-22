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
    <?php if (!is_front_page()) { // 检查是否为首页 ?>
        <div class="before-container"></div>
    <?php } ?>
    <div class="container">
        <div class="footer-columns">
            <?php if (is_active_sidebar('footer_column_1')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer_column_1'); ?>
                    <!-- 添加自定义小工具 -->
                    <?php if (is_active_widget(false, false, 'footer_info_widget', true)) : ?>
                        <?php dynamic_sidebar('footer_info'); ?>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <?php if (is_active_sidebar('footer_column_2')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer_column_2'); ?>
                    <div class="social-icons">
                        <?php
                        $options = get_option('social_link_options');
                        if (!empty($options['social_links'])) {
                            foreach ($options['social_links'] as $link) {
                                if (!empty($link['url']) && !empty($link['icon'])) {
                                    ?>
                                    <a href="<?php echo esc_url($link['url']); ?>" target="_blank">
                                        <img src="<?php echo esc_url($link['icon']); ?>"
                                             alt="<?php echo esc_attr($link['name']); ?>">
                                    </a>
                                    <?php
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            <?php endif; ?>
            <?php if (is_active_sidebar('footer_column_3')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer_column_3'); ?>
                </div>
            <?php endif; ?>
            <?php if (is_active_sidebar('footer_column_4')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer_column_4'); ?>
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
    jQuery(document).ready(function ($) {
        $('.menu-item-has-children').hover(
            function () {
                $(this).find('.dropdown-content').show();
            },
            function () {
                $(this).find('.dropdown-content').hide();
            }
        );
    });
</script>

</body>
</html>
