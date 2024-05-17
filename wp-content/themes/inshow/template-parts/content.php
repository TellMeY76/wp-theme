<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <?php if ( !is_product() ) { // 如果不是商品详情页 ?>
        <h1 class="post-title"><?php the_title(); ?></h1>
        <div class="post-excerpt">
            <?php the_excerpt(); ?>
        </div>
        <div class="entry-meta">
            <?php the_date(); ?> | <?php echo calculate_reading_time(get_the_content()); ?> Min.Read | <?php the_author(); ?>
        </div><!-- .entry-meta -->
    <?php } ?>

    <div class="post-thumbnail">
        <?php the_post_thumbnail('full', array('class' => 'cover-image')); ?>
    </div>

    <div class="entry-content">
        <?php
        the_content(
            sprintf(
                wp_kses(
                /* translators: %s: Name of current post. Only visible to screen readers */
                    __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'inshow' ),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                wp_kses_post( get_the_title() )
            )
        );

        wp_link_pages(
            array(
                'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'inshow' ),
                'after'  => '</div>',
            )
        );
        ?>
    </div><!-- .entry-content -->

    <!-- 商品详情页不显示其他footer内容，这里可以根据需要调整 -->
    <?php if ( !is_product() ) { ?>
        <!-- .entry-footer -->
    <?php } ?>
</article><!-- #post-<?php the_ID(); ?> -->