<?php /* Template Name: Projects Page */ get_header(); ?>
<div class="project-container">
    <?php
    // 直接获取所有一级的project_categories分类，无需指定父分类
    $categories = get_terms([
        'taxonomy' => 'project_categories', // 匹配自定义分类类型
        'parent' => 0, // 添加此行以获取所有一级分类
        'hide_empty' => false,
    ]);

    // 获取当前选中的分类ID，优先从URL参数获取，否则默认为第一个分类
    $current_cat_id = isset($_GET['cat']) && in_array((int)$_GET['cat'], wp_list_pluck($categories, 'term_id')) ? (int)$_GET['cat'] : ($categories ? $categories[0]->term_id : 0);

    // 显示分类标签
    if (!empty($categories)) {
        echo '<div class="project-tabs">';
        foreach ($categories as $cat) {
            $active_class = ($cat->term_id == $current_cat_id) ? 'active' : '';
            echo '<a href="#" data-cat=' .$cat->term_id .' class="tab-link ' . $active_class . '">' . $cat->name . '</a>';
        }
        echo '</div>';
    }

    // 查询并显示项目内容
    $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1; // 获取当前页面的页码
    $cat_args = [
        'post_type' => 'projects',
        'posts_per_page' => 10, // 每页显示的项目数量
        'paged' => $paged, // 当前页码
        'tax_query' => [ // 使用 tax_query 来匹配自定义分类
            [
                'taxonomy' => 'project_categories', // 匹配自定义分类类型
                'field' => 'term_id',
                'terms' => $current_cat_id,
            ],
        ],
    ];


    $cat_query = new WP_Query($cat_args);

    if ($cat_query->have_posts()) {
        echo '<div id="projectItemsContainer" class="project-items-group initial-hide">';
        while ($cat_query->have_posts()) {
            $cat_query->the_post();
            echo '<div class="project-item">';
            if (has_post_thumbnail()) {
                the_post_thumbnail('medium'); // 'medium' 是预定义的图片尺寸，你可以根据需要使用其他尺寸，如'thumbnail', 'large', 或自定义尺寸
            }
            the_title('<h3>', '</h3>');
            the_excerpt();
            // 可以在此处添加更多项目展示细节
            echo '</div>'; // 关闭project-item div
        }
        echo '</div>';

        // 显示分页链接
        echo '<div class="pagination">';
        echo paginate_links( array(
            'total' => $cat_query->max_num_pages, // 总页数
            'current' => max( 1, get_query_var( 'paged' ) ), // 当前页码
        ) );
        echo '</div>';

        wp_reset_postdata();
    } else {
        echo '<p class="empty-container">No projects found for the selected category.</p>';
    }
    ?>
</div>

<?php get_footer(); ?>
