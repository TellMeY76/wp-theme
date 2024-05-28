<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
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
//do_action('woocommerce_before_main_content');
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
        <!-- 新增部分: 特色商品展示 -->
        <section class="featured-products">
            <div class="featured-col-lg">
                <img src="<?php echo get_template_directory_uri(
                    ).'/assets/img/product-list/featured-products-1.png'; ?>"
                     alt="Time to flourish"/>
                <div class="featured-col-lg_info">
                    <h3>Time to flourish</h3>
                    <p>Spring your space to life with small shifts & big</p>
                    <button class="detail-btn">Details <i class="fa-solid fa-arrow-right-long"></i></button>
                </div>
            </div>
            <div class="featured-col-sm">
                <img src="<?php echo get_template_directory_uri(
                    ).'/assets/img/product-list/featured-products-2.png'; ?>"
                     alt="Time to flourish"/>
            </div>
        </section>

        <div class="product-content-block">
            <div class="left-columns">
                <!-- 新增部分: 左侧分类手风琴 -->
                <div class="product-content-category">
                    <?php
                    function recursive_category_tree($categories, $parent = 0, $level = 0)
                    {
                        $html = '';
                        foreach ($categories as $category) {
                            // 更直接地排除特定slug的分类
                            if ($category->parent == $parent && !in_array($category->slug, array('uncategorized'))) {
                                $thumbnail = '';
                                $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
                                if ($thumbnail_id) {
                                    $thumbnail_url = wp_get_attachment_image_src($thumbnail_id, 'thumbnail');
                                    $thumbnail = '<img src="'.esc_url($thumbnail_url[0]).'" alt="'.esc_attr(
                                            $category->name
                                        ).'">';
                                }

                                $has_children = get_term_children($category->term_id, 'product_cat');
                                $class_suffix = $has_children ? ' has-children' : '';
                                $data_attrs = [
                                    'data-href' => $has_children ? '#' : esc_url(get_term_link($category)),
                                    'data-category-name' => esc_html(strtolower($category->name)),
                                ];
                                $data_attrs_str = implode(' ', array_map(function ($k, $v) {
                                    return "$k=\"$v\"";
                                }, array_keys($data_attrs), $data_attrs));

                                $html .= '<li class="category-item level-'.$level.$class_suffix.'"'.$data_attrs_str.'>';
                                $html .= '<div class="category-header">';
                                $html .= $thumbnail;
                                $html .= '<div class="category-header-text">';
                                $html .= '<span>'.esc_html($category->name).'</span>';
                                $html .= '<i class="expanded-icon fa-solid fa-angle-down"></i>';
                                $html .= '</div>';
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

                    // 确保获取未分类的term_id，虽然通常为1，但直接通过slug获取更准确
                    $uncategorized_term = get_term_by('slug', 'uncategorized', 'product_cat');
                    if ($uncategorized_term) {
                        $categories_to_exclude = array($uncategorized_term->term_id);
                    } else {
                        $categories_to_exclude = array();
                    }

                    $all_categories = get_terms(array(
                        'taxonomy' => 'product_cat',
                        'hide_empty' => false,
                        'exclude' => $categories_to_exclude,
                    ));

                    if (is_wp_error($all_categories)) {
                        echo 'Error fetching categories: '.$all_categories->get_error_message();
                    } elseif (!empty($all_categories)) {
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
                // 获取搜索关键词
                $search_query_str = get_search_query();

                // 检查是否进行了搜索
                if (!empty($search_query)) {
                    // 当有搜索关键词时，执行自定义查询
                    $args = array(
                        's' => $search_query_str,
                        'post_type' => 'product',
                    );
                    $search_query = new WP_Query($args);

                    if ($search_query->have_posts()) {
                        // 正常展示搜索结果
                        do_action('woocommerce_before_shop_loop');
                        echo '<ul class="products columns-3">';
                        while ($search_query->have_posts()) {
                            $search_query->the_post();
                            wc_get_template('content-product-custom.php');
                        }
                        echo '</ul>';
                        do_action('woocommerce_after_shop_loop');
                    } else {
                        wc_no_products_found();
                    }
                    wp_reset_postdata(); // 重置查询
                } else {
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
                }
                ?>
            </div>
        </div>

        <section class="contact-info-block">
            <div class="example-block">
                <p class="example-title">Light Steel House Construction Applications </p>
                <div class="example-list">
                    <div class="example-item">
                        <div class="example-item-icon-block">
                           <span class="example-item-icon"> <img
                                       src="<?php echo get_template_directory_uri().'/assets/img/detail-icon-1.png'; ?>"
                                       alt="Residential Construction"/></span>
                        </div>
                        <h3>Residential Construction:</h3>
                        <p>LGS buildings are popular for
                            constructing modern homes, multi-
                            story apartments, and housing
                            developments due to their strength,
                            design flexibility, and rapid
                            construction.</p>
                    </div>
                    <div class="example-item">
                        <div class="example-item-icon-block">
                           <span class="example-item-icon"> <img
                                       src="<?php echo get_template_directory_uri().'/assets/img/detail-icon-2.png'; ?>"
                                       alt="Commercial Spaces"/>
                           </span>
                        </div>
                        <h3>Commercial Spaces:</h3>
                        <p>From office buildings to retail
                            outlets, LGS structures offer efficient
                            and adaptable spaces for
                            businesses, allowing for customized
                            layouts and quick occupancy.</p>
                    </div>
                    <div class="example-item">
                        <div class="example-item-icon-block">
                           <span class="example-item-icon"> <img
                                       src="<?php echo get_template_directory_uri().'/assets/img/detail-icon-3.png'; ?>"
                                       alt="Industrial Applications"/>
                           </span>
                        </div>
                        <h3>Industrial Applications:</h3>
                        <p>Factories, warehouses, and
                            industrial facilities benefit from the
                            durability and cost-effectiveness of
                            LGS construction, meeting the
                            demands of robust and functional
                            structures.</p>
                    </div>
                    <div class="example-item">
                        <div class="example-item-icon-block">
                           <span class="example-item-icon">  <img
                                       src="<?php echo get_template_directory_uri().'/assets/img/detail-icon-4.png'; ?>"
                                       alt="Industrial Buildings"/>
                           </span>
                        </div>
                        <h3>Institutional Buildings:</h3>
                        <p>Schools, healthcare facilities, and
                            other public buildings can utilize
                            LGS construction for its ability to
                            create safe, durable, and
                            customized spaces for diverse
                            purposes.</p>
                    </div>
                </div>
            </div>
            <?php
            do_action('after_contact_info_block');
            ?>
        </section>


    </div>


<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action('woocommerce_after_main_content');

get_footer('shop');