<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package InShow
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <?php the_post_thumbnail('full', array('class' => 'cover-image')); ?>
    <h1 class="post-title"><?php the_title(); ?></h1>
    <?php
    if ( 'post' === get_post_type() ) :
        ?>
        <div class="entry-meta">
            <?php
            inshow_posted_on();
            inshow_posted_by();
            ?>
        </div><!-- .entry-meta -->
    <?php endif; ?>
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

	<!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
