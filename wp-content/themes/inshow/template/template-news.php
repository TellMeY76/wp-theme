<?php
/**
 * Template Name: 新闻页面模板
 */
get_header(); // 确保调用头部模板

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
    'post_type' => 'news', // 查询自定义文章类型为 news
    'posts_per_page' => 10,
    'paged' => $paged,
    'orderby' => 'date',
    'order' => 'DESC',
    'taxonomy' => 'news_categories', // 使用 news_categories 分类法进行分类
);

$query = new WP_Query($args);
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main view-main">
        <?php if ($query->have_posts()) : ?>
            <div class="news-flex-container">
                <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <?php if ($query->current_post === 0): ?>
                        <!-- 首个新闻全宽显示的代码 -->
                        <article class="news-feature">
                            <?php the_post_thumbnail('large'); ?>
                            <header>
                                <div class="news-category">
                                    <?php
                                    // 获取并显示首个新闻的子分类
                                    $categories = get_the_terms(get_the_ID(), 'news_categories');
                                    $child_category_names = [];
                                    foreach ($categories as $category) {
                                        if (!in_array($category->name, $child_category_names)) {
                                            $child_category_names[] = $category->name;
                                        }
                                    }
                                    echo implode(', ', $child_category_names);
                                    ?>
                                </div>
                                <h1><?php the_title(); ?></h1>
                                <a href="<?php the_permalink(); ?>" class="detail-button">Detail <i class="fa-solid fa-arrow-right-long"></i></a>
                            </header>
                        </article>
                    <?php else: ?>
                        <div class="news-item">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium'); ?>
                                <div class="news-content">
                                    <div class="meta-info">
                                        <div class="news-category">
                                            <?php
                                            // 获取并显示其他新闻的子分类
                                            $categories = get_the_terms(get_the_ID(), 'news_categories');
                                            $child_category_names = [];
                                            foreach ($categories as $category) {
                                                if (!in_array($category->name, $child_category_names)) {
                                                    $child_category_names[] = $category->name;
                                                }
                                            }
                                            echo implode(', ', $child_category_names);
                                            ?>
                                        </div>
                                        <time><?php  the_time('Y/m/d'); ?></time>
                                    </div>
                                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                </div>
                            </a>
                        </div>
                    <?php endif; ?>
                <?php endwhile; ?>
            </div>
            <?php echo paginate_links(array(
                'prev_text' => __('<'),
                'next_text' => __('>'),
                'total' => $query->max_num_pages,
                'current' => max( 1, get_query_var( 'paged' ) ), // 当前页码
            )); ?>
        <?php else: ?>
            <p>no News.</p>
        <?php endif; ?>
    </main><!-- #main -->
</div><!-- #primary -->

<?php wp_reset_postdata(); ?>
<?php get_footer(); // 确保调用尾部模板 ?>
