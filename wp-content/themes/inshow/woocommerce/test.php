<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * However, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined('ABSPATH') || exit;

get_header('shop');

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */

?>
    <header class="woocommerce-products-header">
        <?php
        /**
         * Hook: woocommerce_archive_description.
         *
         * @hooked woocommerce_taxonomy_archive_description - 10
         * @hooked woocommerce_product_archive_description - 10
         */
        do_action('woocommerce_archive_description');
        ?>
    </header>
    <div class="product-list-container">


        <div class="product-content-block">
            <div class="left-columns">
                <!-- 新增部分: 左侧分类手风琴 -->
                <div class="product-content-category">
                    <?php
                    // 自定义函数递归生成分类树
                    function recursive_category_tree($categories, $parent = 0, $level = 0)
                    {
                        $html = '';
                        foreach ($categories as $category) {
                            if ($category->parent == $parent && $category->term_id != get_option(
                                    'default_category'
                                )) { // 排除未分类分类
                                $thumbnail = '';
                                // 检查是否有缩略图
                                $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
                                if (!empty($thumbnail_id)) {
                                    $thumbnail_url = wp_get_attachment_image_src($thumbnail_id, 'thumbnail');
                                    $thumbnail = '<img src="'.esc_url($thumbnail_url[0]).'" alt="'.esc_attr(
                                            $category->name
                                        ).'">';
                                }

                                // 检查当前分类是否有子分类
                                $has_children = get_term_children($category->term_id, 'product_cat');
                                $has_children_class = $has_children ? ' has-children' : '';

                                // 判断是否当前分类有子目录，如果没有则添加链接和特定类
                                $link = $has_children ? '#' : get_term_link($category);
                                $item_class = 'category-item level-'.$level.$has_children_class;
                                $link_data = $has_children ? '' : ' data-href="'.esc_url(get_term_link($category)).'"';

                                $html .= '<li class="'.$item_class.'"'.$link_data.'>';
                                $html .= '<div class="category-header">';
                                $html .= $thumbnail;
                                $html .= '<span>'.esc_html($category->name).'</span>';
                                $html .= '</div>';

                                if ($has_children) {
                                    $html .= '<ul class="subcategory-list" style="display:none;">';
                                    $html .= recursive_category_tree($categories, $category->term_id, $level + 1);
                                    $html .= '</ul>';
                                }

                                $html .= '</li>';
                            }
                        }

                        return $html;
                    }

                    // 获取所有产品分类，排除未分类分类
                    $all_categories = get_terms(array(
                        'taxonomy' => 'product_cat',
                        'hide_empty' => false,
                        'exclude' => array(get_option('default_category')), // 排除未分类分类
                    ));

                    // 检查是否成功获取到分类
                    if (!empty($all_categories) && !is_wp_error($all_categories)) {
                        // 生成并输出分类树的HTML
                        echo '<ul id="category-accordion">'.recursive_category_tree($all_categories).'</ul>';
                    } else {
                        echo 'No categories found.';
                    }
                    ?>
                </div>

                <!-- 右侧最新商品模块 -->
                <div class="latest-products">
                    <h2 class="latest-products-title">Latest Products</h2>
                    <ul class="latest-products-list">
                        <?php
                        // 查询最新的三个商品
                        $latest_products = wc_get_products(array(
                            'limit' => 3,
                            'orderby' => 'date',
                            'order' => 'DESC',
                        ));

                        // 循环输出最新的三个商品
                        foreach ($latest_products as $product) {
                            echo '<li class="latest-products-item">';
                            echo '<a class="latest-products-item_link" href="'.esc_url(
                                    get_permalink($product->get_id())
                                ).'">'; // Open link tag
                            echo '<div class="product-thumbnail">'.$product->get_image(
                                ).'</div>'; // Display product image
                            echo '<div class="product-info">'; // Open product info container
                            echo '<h3>'.esc_html($product->get_name()).'</h3>'; // Display product name
                            echo '<p>'.wp_kses_post(
                                    wp_trim_words($product->get_description(), 20)
                                ).'</p>'; // Display trimmed product description
                            echo '</div>'; // Close product info container
                            echo '</a>'; // Close link tag
                            echo '</li>';
                        }
                        ?>
                    </ul>
                </div>
            </div>
            <!-- 商品列表部分 -->
            <div class="product-content-list">
                <?php
                if (woocommerce_product_loop()) {

                    /**
                     * Hook: woocommerce_before_shop_loop.
                     *
                     * @hooked woocommerce_output_all_notices - 10
                     * @hooked woocommerce_result_count - 20
                     * @hooked woocommerce_catalog_ordering - 30
                     */
                    do_action('woocommerce_before_shop_loop');

                    woocommerce_product_loop_start();

                    if (wc_get_loop_prop('total')) {
                        while (have_posts()) {
                            the_post();

                            /**
                             * Hook: woocommerce_shop_loop.
                             */
                            do_action('woocommerce_shop_loop');

                            wc_get_template('content-product-custom.php');
                        }
                    }

                    woocommerce_product_loop_end();

                    /**
                     * Hook: woocommerce_after_shop_loop.
                     *
                     * @hooked woocommerce_pagination - 10
                     */
                    do_action('woocommerce_after_shop_loop');
                } else {
                    /**
                     * Hook: woocommerce_no_products_found.
                     *
                     * @hooked wc_no_products_found - 10
                     */
                    do_action('woocommerce_no_products_found');
                }
                ?>
            </div>
        </div>
    </div>


<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action('woocommerce_after_main_content');

get_footer('shop');