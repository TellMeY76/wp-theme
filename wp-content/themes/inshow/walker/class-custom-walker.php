<?php
/**
 * Custom Walker Category Class to display category thumbnail alongside the name.
 */
class Custom_Walker_Category extends Walker_Category {
    function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
        // Ensure $current_category and $extra_class are defined, providing defaults if needed.
        $current_category = isset($args['current_category']) ? $args['current_category'] : array();
        $extra_class = isset($args['extra_class']) ? ' ' . $args['extra_class'] : '';
        $rel = isset($args['rel']) ? $args['rel'] : '';
        $show_count = isset($args['show_count']) ? $args['show_count'] : false;
        $hierarchical = isset($args['hierarchical']) ? $args['hierarchical'] : false;

        $cat_name = esc_attr( $category->name );
        $cat_thumb = wp_get_attachment_image_src( get_term_meta( $category->term_id, 'thumbnail_id', true ), 'thumbnail' );
        $thumbnail = !empty( $cat_thumb ) ? '<img src="' . esc_url( $cat_thumb[0] ) . '" alt="' . $cat_name . '" />' : ''; // You can set a default image here if needed

        $cat_class = in_array( $category->term_id, $current_category ) ? 'current-cat' : '';
        $cat_class .= ($category->term_id == get_query_var('cat')) ? ' current-cat-parent' : '';

        $output .= "\n<li class='" . $cat_class . $extra_class . "'>";
        $output .= '<div class="category-wrap">';
        $output .= '<span class="category-thumb">' . $thumbnail . '</span>';
        $output .= '<span class="category-name"><a href="' . get_term_link($category->term_id) . '" ' . $rel . '>' . $cat_name . '</a></span>';
        $output .= '</div>';

        if ( !empty($show_count) ) {
            $output .= ' (' . intval($category->count) . ')';
        }

        if ( $hierarchical && $depth > 0 && isset($args['child_of']) && $args['child_of'] == 0 ) {
            $output .= str_repeat( apply_filters( 'category_indicator', ' › ', $category ), $depth );
        }

        $output .= '</li>';
    }
}

?>
