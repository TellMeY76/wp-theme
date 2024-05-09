<?php
/*
Template Name: Q&A Page
*/

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

// Get the main 'faqs' category object
$faqs_category = get_term_by('slug', 'faqs', 'category');
if ($faqs_category && !is_wp_error($faqs_category)) {

    // Get all child categories of 'faqs'
    $child_categories = get_terms([
        'taxonomy' => 'category',
        'parent' => $faqs_category->term_id,
        'hide_empty' => false
    ]);

    // If there are child categories, loop through them
    if (!empty($child_categories)) {
        foreach ($child_categories as $category) {
            $category_posts = get_posts([
                'post_type' => 'post',
                'posts_per_page' => -1,
                'category__in' => [$category->term_id],
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
                    the_excerpt();
                    echo '</div>';
                    echo '</div>'; // End qa-item
                }

                wp_reset_postdata();
                echo '</div></div>'; // Close qa-category-group and faqs-list-item
            }
        }
    } else { // If no child categories, just get posts under 'faqs'
        $faqs_posts = get_posts([
            'post_type' => 'post',
            'posts_per_page' => -1,
            'category_name' => 'faqs',
        ]);

        if (!empty($faqs_posts)) {
            echo '<div class="faqs-list-item">';
            echo '<h2 class="faqs-category-title">' . esc_html($faqs_category->name) . '</h2>';
            echo '<div class="qa-category-group">';

            foreach ($faqs_posts as $post) {
                setup_postdata($post);
                echo '<div class="qa-item">';
                echo '<div class="qa-toggle">';
                echo '<span class="qa-question">' . get_the_title() . '</span>';
                echo '<i class="fa-solid fa-caret-down toggle-icon"></i>';
                echo '</div>';
                echo '<div class="qa-answer" style="max-height:0; overflow:hidden;">';
                the_excerpt();
                echo '</div>';
                echo '</div>'; // End qa-item
            }

            wp_reset_postdata();
            echo '</div></div>'; // Close qa-category-group and faqs-list-item
        }
    }
} else {
    echo '<p>No "FAQs" category found</p>';
}

echo '</div>'; // Close faqs-list
echo '</div>'; // Close faqs-container

get_footer();
?>