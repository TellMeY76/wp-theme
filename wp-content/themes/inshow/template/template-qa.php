<?php
/* Template Name: Q&A Page */
get_header();
echo '<div class="faqs-container">';
echo '<div class="banner-block">';
echo '<img src="' . get_template_directory_uri() . '/assets/img/faqs-banner.png" alt="Q&A Banner">';
echo '<div class="banner-title-block">';
echo '<p class="banner-title">FREQUENTLY ASKED QUESTIONS</p>';
echo '<p class="banner-title">QUESTIONS</p>';
echo '</div>';
echo '</div>';
echo '<div class="faqs-list">';
// Get the main 'faqs_categories' taxonomy object
$faqs_categories = get_terms([
    'taxonomy' => 'faqs_categories',
    'hide_empty' => false
]);
if ($faqs_categories && !is_wp_error($faqs_categories)) {
    // If there are categories, loop through them
    foreach ($faqs_categories as $category) {
        $category_posts = get_posts([
            'post_type' => 'faqs',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'faqs_categories',
                    'field' => 'slug',
                    'terms' => $category->slug,
                ),
            ),
        ]);
        if (!empty($category_posts)) {
            echo '<div class="faqs-list-item">';
            echo '<h2 class="faqs-category-title">' . esc_html($category->name) . '</h2>';
            echo '<div class="qa-category-group">';
            foreach ($category_posts as $post) {
                setup_postdata($post);
                echo '<div class="qa-item">';
                echo '<div class="qa-toggle">';
                echo '<span class="qa-question">' . get_the_title() . '</span>';
                echo '<i class="fa-solid fa-caret-down toggle-icon"></i>';
                echo '</div>';
                echo '<div class="qa-answer" style="max-height:0; overflow:hidden;">';
                the_content();
                echo '</div>';
                echo '</div>'; // End qa-item
            }
            wp_reset_postdata();
            echo '</div></div>'; // Close qa-category-group and faqs-list-item
        }
    }
} else {
    echo '<p>No "FAQs" categories found</p>';
}
echo '</div>'; // Close faqs-list
echo '<div class="after-faqs-list">';

do_action('after_faqs_list');
echo '</div>'; // Close faqs-container

echo '</div>'; // Close faqs-container
get_footer();
?>
