<?php
/**
 * InShow functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package InShow
 */

if (!defined('_S_VERSION')) {
    // Replace the version number of the theme on each release.
    define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */


/**
 * Customize WooCommerce Single Product Summary
 */
function custom_woocommerce_single_product_summary_actions()
{
    // Add product title after gallery
//    add_action('woocommerce_single_product_summary', 'add_product_title_after_gallery', 5);

    // Remove product meta
    remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);

    // Remove product categories (if they are output via woocommerce_single_product_summary hook)
    remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_categories', 30);
    // Remove the default add to cart button
    remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);

    // Add custom
    add_action('woocommerce_single_product_summary', 'custom_add_inquiry_and_chat_buttons', 35);

    add_action('woocommerce_single_product_summary', 'display_product_sku', 6);

    add_action('woocommerce_single_product_summary', 'display_custom_product_fields', 7);

}

add_action('init', 'custom_woocommerce_single_product_summary_actions');

function inshow_setup()
{

    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Make theme available for translation.
    load_theme_textdomain('inshow', get_template_directory().'/languages');


    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(
        array(
            'menu-1' => esc_html__('Primary', 'inshow'),
        )
    );

    // Switch default core markup for search form, comment form, and comments to output valid HTML5.
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    // Set up the WordPress core custom background feature.
    add_theme_support(
        'custom-background',
        apply_filters(
            'inshow_custom_background_args',
            array(
                'default-color' => 'ffffff',
                'default-image' => '',
            )
        )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for core custom logo.
    add_theme_support(
        'custom-logo',
        array(
            'height' => 250,
            'width' => 250,
            'flex-width' => true,
            'flex-height' => true,
        )
    );

}

add_action('after_setup_theme', 'inshow_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function inshow_content_width()
{
    $GLOBALS['content_width'] = apply_filters('inshow_content_width', 640);
}

add_action('after_setup_theme', 'inshow_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function inshow_widgets_init()
{
    register_sidebar(
        array(
            'name' => esc_html__('Sidebar', 'inshow'),
            'id' => 'sidebar-1',
            'description' => esc_html__('Add widgets here.', 'inshow'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget' => '</section>',
            'before_title' => '<h2 class="widget-title">',
            'after_title' => '</h2>',
        )
    );
}

add_action('widgets_init', 'inshow_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function inshow_scripts()
{
    wp_enqueue_style('inshow-style', get_stylesheet_uri(), array(), _S_VERSION);
    wp_style_add_data('inshow-style', 'rtl', 'replace');
    wp_enqueue_script(
        'custom-message-js',
        get_template_directory_uri().'/js/custom-message.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_script('inshow-navigation', get_template_directory_uri().'/js/navigation.js', array(), _S_VERSION, true);
    wp_enqueue_script(
        'custom-menu-js',
        get_template_directory_uri().'/js/custom-menu.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_script(
        'custom-index-js',
        get_template_directory_uri().'/js/custom-index.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_script(
        'projects-tabs-js',
        get_template_directory_uri().'/js/projects-tabs.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_script(
        'custom-chat-js',
        get_template_directory_uri().'/js/custom-chat.js',
        array('jquery'),
        '1.0.0',
        true
    );
    wp_enqueue_script(
        'custom-category-js',
        get_template_directory_uri().'/js/custom-category.js',
        array('jquery'),
        '1.0.0',
        true
    );

    wp_enqueue_style('font-awesome', get_template_directory_uri().'/assets/css/fontawesome.all.min.css');
    wp_enqueue_script(
        'qna-accordion',
        get_template_directory_uri().'/js/qna-accordion.js',
        array('jquery'),
        '1.0.0',
        true
    );
    // 加载Smart Wizard的CSS和JS
    wp_enqueue_style('smartwizard-css', get_template_directory_uri().'/blocks/stepper-block/css/smart_wizard.min.css');
    wp_enqueue_script(
        'smartwizard-js',
        get_template_directory_uri().'/blocks/stepper-block/js/jquery.smartWizard.min.js',
        array('jquery'),
        '',
        true
    );
    wp_enqueue_script(
        'inshow-stepper-block-init',
        get_template_directory_uri().'/js/stepper-block-init.js',
        array('jquery', 'smartwizard-js'),
        '',
        true
    );

    wp_localize_script('projects-tabs-js', 'ajax_object', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('load_projects_by_category_nonce'),
    ));

    $woocommerce_url = WC()->plugin_url();

    // 添加 WooCommerce 样式文件
    wp_enqueue_style('woocommerce-style', $woocommerce_url.'/assets/css/woocommerce.css');
    wp_enqueue_style('woocommerce-layout', $woocommerce_url.'/assets/css/woocommerce-layout.css');

    // 添加 WC 产品画廊缩放和灯箱功能所需的 JavaScript 和 CSS
    wp_enqueue_script(
        'wc-product-gallery-zoom',
        $woocommerce_url.'/assets/js/frontend/product-gallery-zoom.min.js',
        array('jquery', 'zoom'),
        false,
        true
    );
    wp_enqueue_script(
        'wc-product-gallery-lightbox',
        $woocommerce_url.'/assets/js/frontend/product-gallery-lightbox.min.js',
        array('jquery', 'photoswipe-ui-default'),
        false,
        true
    );
    wp_enqueue_style('wc-product-gallery-style', $woocommerce_url.'/assets/css/photoswipe.css');
}

add_action('wp_enqueue_scripts', 'inshow_scripts');

/**
 * Enqueue block editor assets.
 */
function inshow_enqueue_block_assets()
{
    wp_enqueue_script(
        'inshow-stepper-block',
        get_template_directory_uri().'/blocks/stepper-block/index.js',
        array('wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor'),
        filemtime(get_template_directory().'/blocks/stepper-block/index.js'),
        true
    );
}

add_action('enqueue_block_editor_assets', 'inshow_enqueue_block_assets');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory().'/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory().'/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory().'/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory().'/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory().'/inc/jetpack.php';
}


/**
 * Register Footer Widget Areas
 */
if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => __('Footer Column 1', 'your-textdomain'),
        'id' => 'footer_column_1',
        'description' => __('Widgets in this area will be shown in the first column of the footer.', 'your-textdomain'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="footer-widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => __('Footer Column 2', 'your-textdomain'),
        'id' => 'footer_column_2',
        'description' => __(
            'Widgets in this area will be shown in the second column of the footer.',
            'your-textdomain'
        ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="footer-widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => __('Footer Column 3', 'your-textdomain'),
        'id' => 'footer_column_3',
        'description' => __('Widgets in this area will be shown in the third column of the footer.', 'your-textdomain'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h1 class="footer-widget-title">',
        'after_title' => '</h1>',
    ));
    register_sidebar(array(
        'name' => __('Footer Column 4', 'your-textdomain'),
        'id' => 'footer_column_4',
        'description' => __(
            'Widgets in this area will be shown in the fourth column of the footer.',
            'your-textdomain'
        ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h1 class="footer-widget-title">',
        'after_title' => '</h1>',
    ));
}

/**
 * Add Custom Settings
 */
function add_custom_settings()
{
    register_setting('my_custom_settings_group', 'my_address_setting');
    register_setting('my_custom_settings_group', 'my_phone_setting');
}

add_action('admin_init', 'add_custom_settings');

/**
 * Add Settings Page
 */
function custom_admin_menu()
{
    add_options_page(
        '地址与联系方式',
        '地址与联系方式',
        'manage_options',
        'contact_settings',
        'custom_contact_settings_page'
    );
    add_menu_page(
        'Chat Data List', // 菜单项的标题
        'Chat Data', // 显示在菜单中的标题
        'manage_options', // 设置访问权限，这里是管理员权限
        'chat_data_list', // 菜单项的唯一标识符，也是页面的slug
        'display_chat_data_page', // 回调函数，用于生成页面内容
        'dashicons-email-alt', // 菜单项图标
        60 // 菜单的位置
    );
}

add_action('admin_menu', 'custom_admin_menu');

// chat now 数据自定义表以及数据存储
function create_chat_data_table()
{
    global $wpdb;

    $table_name = $wpdb->prefix.'chat_data';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        product_name tinytext NOT NULL,
        email tinytext NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH.'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// 或者对于主题，您可以在after_setup_theme钩子上运行
add_action('after_setup_theme', 'create_chat_data_table');

function save_chat_data()
{
    global $wpdb;
    $table_name = $wpdb->prefix.'chat_data';

    if (isset($_POST['product_name']) && isset($_POST['user_email'])) {
        $productName = sanitize_text_field($_POST['product_name']);
        $userEmail = sanitize_email(urldecode($_POST['user_email']));

        // 尝试插入数据
        $result = $wpdb->insert(
            $table_name,
            array(
                'product_name' => $productName,
                'email' => $userEmail,
            ),
            array('%s', '%s')
        );

        if ($result) {
            // 数据插入成功
            wp_send_json_success('Data inserted successfully.');
        } else {
            // 数据插入失败
            wp_send_json_error('Failed to insert data.');
        }
    } else {
        // 缺少必要的数据
        wp_send_json_error('Missing required data.');
    }

    // 结束 WordPress 请求
    wp_die();
}

add_action('wp_ajax_nopriv_save_chat_data', 'save_chat_data');
add_action('wp_ajax_save_chat_data', 'save_chat_data');

// chat now 数据数据后台页面内容
function display_chat_data_page()
{
    global $wpdb;
    $table_name = $wpdb->prefix.'chat_data';

    $results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    ?>
    <div class="wrap">
        <h1><?php echo esc_html__('Chat Data List', 'your-text-domain'); ?></h1>
        <?php if ($results): ?>
            <table class="widefat">
                <thead>
                <tr>
                    <th><?php echo esc_html__('Product Name', 'your-text-domain'); ?></th>
                    <th><?php echo esc_html__('Email', 'your-text-domain'); ?></th>
                    <th><?php echo esc_html__('Date', 'your-text-domain'); ?></th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($results as $result): ?>
                    <tr>
                        <td><?php echo esc_html($result->product_name); ?></td>
                        <td><?php
                            echo esc_html($result->email);
                            ?></td>
                        <td><?php echo date_i18n(get_option('date_format'), strtotime($result->created_at)); ?></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p><?php echo esc_html__('No chat data found.', 'your-text-domain'); ?></p>
        <?php endif; ?>
    </div>
    <?php
}


function custom_contact_settings_page()
{
    ?>
    <form method="post" action="options.php">
        <?php settings_fields('my_custom_settings_group'); ?>
        <?php do_settings_sections('my_custom_settings_group'); ?>

        <table class="form-table">
            <tr valign="top">
                <th scope="row">地址</th>
                <td><input type="text" name="my_address_setting"
                           value="<?php echo esc_attr(get_option('my_address_setting')); ?>"/></td>
            </tr>
            <tr valign="top">
                <th scope="row">电话</th>
                <td><input type="text" name="my_phone_setting"
                           value="<?php echo esc_attr(get_option('my_phone_setting')); ?>"/></td>
            </tr>
        </table>

        <?php submit_button(); ?>
    </form>
    <?php
}

function add_product_title_after_gallery()
{
    global $product;
    echo '<h2 class="after-gallery-title">'.get_the_title($product->get_id()).'</h2>';
}

// 将数字星级转换为星星符号
function convert_star_rating_to_stars($rating)
{
    $stars = '';
    $filled_star = '<i class="fas fa-star"></i>';
    $half_star = '<i class="fas fa-star-half-alt"></i>';
    $empty_star = '<i class="far fa-star"></i>';

    $filled_count = floor($rating);
    $remainder = $rating - $filled_count;

    // 添加填充的星星
    for ($i = 0; $i < $filled_count; $i++) {
        $stars .= $filled_star;
    }

    // 添加半颗星（如果有）
    if ($remainder >= 0.25 && $remainder < 0.75) {
        $stars .= $half_star;
    }

    // 添加空的星星
    for ($i = 0; $i < 5 - ceil($rating); $i++) {
        $stars .= $empty_star;
    }

    return $stars;
}


function display_custom_product_fields()
{
    global $product;
    // 自定义星级
    $custom_star_rating = get_post_meta($product->get_id(), '_custom_star_rating', true);
    if (!empty($custom_star_rating)) {
        $stars = convert_star_rating_to_stars($custom_star_rating);
        echo '<p class="product-star-rating"> '.$stars.'</p>';
    }
}

function display_product_sku()
{
    global $product;

    // 获取产品的SKU
    $sku = $product->get_sku();

    // 检查SKU是否存在，如果存在则显示
    if ($sku) {
        echo '<p class="product-sku"><strong>'.__('SKU:', 'text-domain').'</strong> '.esc_html($sku).'</p>';
    }
}

function custom_add_inquiry_and_chat_buttons()
{
    global $product;

    $product_name = get_the_title($product->get_id());

    echo '<div class="product-custom-buttons">';
    // Send Inquiry Button
    echo '<button id="sendInquiryBtn"  class="button send-inquiry">SEND INQUIRY</>';

    // Chat Now Button
    echo '<button id="chatNowBtn" data-product-name="'.$product_name.'" class="button chat-now" target="_blank">CHAT NOW</button>';

    echo '</div>';
}

// 底部小工具
class Footer_Info_Widget extends WP_Widget
{
    public function __construct()
    {
        parent::__construct(
            'footer_info_widget',
            __('Footer Information Widget', 'your-textdomain'),
            [
                'description' => __(
                    'A widget to display site logo, title, subtitle, address, and working hours.',
                    'your-textdomain'
                ),
            ]
        );
    }

    public function form($instance)
    {
        $logo_url = !empty($instance['logo_url']) ? $instance['logo_url'] : '';
        $address = !empty($instance['address']) ? $instance['address'] : '';
        $officeHour = !empty($instance['officeHour']) ? $instance['officeHour'] : '';

        ?>
        <p>
            <label for="<?php echo $this->get_field_id('logo_url'); ?>"><?php _e(
                    'Logo Image:',
                    'your-textdomain'
                ); ?></label><br>
            <input type="hidden" id="<?php echo $this->get_field_id('logo_url'); ?>"
                   name="<?php echo $this->get_field_name('logo_url'); ?>" value="<?php echo esc_url($logo_url); ?>">
            <?php if ($logo_url) : ?>
                <img src="<?php echo esc_url($logo_url); ?>" id="<?php echo $this->get_field_id('logo_preview'); ?>"
                     style="max-width:100%;"/>
            <?php endif; ?>
            <input type="button" class="button button-secondary" value="<?php _e('Upload Image', 'your-textdomain'); ?>"
                   id="footer_upload_btn">
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('address'); ?>"><?php _e(
                    'Address:',
                    'your-textdomain'
                ); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('address'); ?>"
                   name="<?php echo $this->get_field_name('address'); ?>" value="<?php echo esc_html($address); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('officeHour'); ?>"><?php _e(
                    'Office Hours:',
                    'your-textdomain'
                ); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('officeHour'); ?>"
                   name="<?php echo $this->get_field_name('officeHour'); ?>"
                   value="<?php echo esc_html($officeHour); ?>">
        </p>

        <script>
            document.addEventListener('DOMContentLoaded', function () {
                jQuery(document).on('click', '#footer_upload_btn', function (e) {
                    e.preventDefault();
                    var frame = wp.media({
                        title: '<?php _e('Select or Upload an Image', 'your-textdomain'); ?>',
                        library: {type: 'image'},
                        button: {text: '<?php _e('Use Image', 'your-textdomain'); ?>'},
                        multiple: false
                    });

                    frame.on('select', function () {
                        var attachment = frame.state().get('selection').first().toJSON();
                        jQuery('#<?php echo $this->get_field_id('logo_url'); ?>').val(attachment.url);
                        jQuery('#<?php echo $this->get_field_id('logo_preview'); ?>').attr('src', attachment.url);
                    });

                    frame.open();
                });
            });
        </script>
        <?php
    }

    public function update($newInstance, $oldInstance)
    {
        $instance = $oldInstance;
        $instance['logo_url'] = esc_url_raw($newInstance['logo_url']);
        $instance['address'] = sanitize_text_field($newInstance['address']);
        $instance['officeHour'] = sanitize_text_field($newInstance['officeHour']);

        return $instance;
    }

    public function widget($args, $instance)
    {
        echo $args['before_widget'];
        $logo_url = !empty($instance['logo_url']) ? $instance['logo_url'] : '';
        $title = get_bloginfo('name');
        $sub_title = get_bloginfo('description');
        $address = !empty($instance['address']) ? $instance['address'] : '';
        $officeHour = !empty($instance['officeHour']) ? $instance['officeHour'] : '';

        ?>
        <div class="footer-widget footer-info-widget">
            <div class="site-branding">
                <?php if ($logo_url) : ?>
                    <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr($title); ?>">
                <?php endif; ?>
                <div class="site-title-block">
                    <?php if ($title) : ?>
                        <h1 class="site-title"><?php echo esc_html($title); ?></h1>
                    <?php endif; ?>
                    <?php if ($sub_title) : ?>
                        <p class="site-description"><?php echo esc_html($sub_title); ?></p>
                    <?php endif; ?>
                </div>
            </div>

            <?php if ($address) : ?>
                <h2><?php _e('Address', 'your-textdomain'); ?></h2>
                <p><?php echo esc_html($address); ?></p>
            <?php endif; ?>

            <?php if ($officeHour) : ?>
                <h2><?php _e('Office Hours', 'your-textdomain'); ?></h2>
                <p><?php echo esc_html($officeHour); ?></p>
            <?php endif; ?>
        </div>
        <?php
        echo $args['after_widget'];
    }
}

class Footer_Contact_Widget extends WP_Widget
{
    public function __construct()
    {
        parent::__construct(
            'footer_contact_widget',
            __('Footer Contact Widget', 'your-textdomain'),
            ['description' => __('A widget to display phone, customer service, and service center.', 'your-textdomain')]
        );
    }

    public function form($instance)
    {
        $phone = !empty($instance['phone']) ? $instance['phone'] : '';
        $service_center = !empty($instance['service_center']) ? $instance['service_center'] : '';
        $customer_service = !empty($instance['customer_service']) ? $instance['customer_service'] : '';

        ?>
        <p>
            <label for="<?php echo $this->get_field_id('phone'); ?>"><?php _e('Phone:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('phone'); ?>"
                   name="<?php echo $this->get_field_name('phone'); ?>" value="<?php echo esc_html($phone); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('service_center'); ?>"><?php _e(
                    'Service Center:',
                    'your-textdomain'
                ); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('service_center'); ?>"
                   name="<?php echo $this->get_field_name('service_center'); ?>"
                   value="<?php echo esc_html($service_center); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('customer_service'); ?>"><?php _e(
                    'Customer Service:',
                    'your-textdomain'
                ); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('customer_service'); ?>"
                   name="<?php echo $this->get_field_name('customer_service'); ?>"
                   value="<?php echo esc_html($customer_service); ?>">
        </p>
        <?php
    }

    public function update($newInstance, $oldInstance)
    {
        $instance = $oldInstance;
        $instance['phone'] = sanitize_text_field($newInstance['phone']);
        $instance['service_center'] = sanitize_text_field($newInstance['service_center']);
        $instance['customer_service'] = sanitize_text_field($newInstance['customer_service']);

        return $instance;
    }

    public function widget($args, $instance)
    {
        echo $args['before_widget'];
        $phone = !empty($instance['phone']) ? $instance['phone'] : '';
        $service_center = !empty($instance['service_center']) ? $instance['service_center'] : '';
        $customer_service = !empty($instance['customer_service']) ? $instance['customer_service'] : '';

        ?>
        <div class="footer-widget footer-contact-widget">
            <h1 class="footer-widget-title"><?php _e('Get in Touch', 'your-textdomain'); ?></h1>

            <?php if ($phone) : ?>
                <div class="footer-contact-widget_block">
                    <h2><?php _e('Phone', 'your-textdomain'); ?></h2>
                    <p><?php echo esc_html($phone); ?></p>
                </div>
            <?php endif; ?>

            <?php if ($service_center) : ?>
                <div class="footer-contact-widget_block">
                    <h2><?php _e('Service Center', 'your-textdomain'); ?></h2>
                    <p><?php echo esc_html($service_center); ?></p>
                </div>
            <?php endif; ?>

            <?php if ($customer_service) : ?>
                <div class="footer-contact-widget_block">
                    <h2><?php _e('Customer Service', 'your-textdomain'); ?></h2>
                    <p><?php echo esc_html($customer_service); ?></p>
                </div>
            <?php endif; ?>
        </div>
        <?php
        echo $args['after_widget'];
    }
}

/**
 * 自定义小工具：友情链接
 */
class Custom_Friendship_Widget extends WP_Widget
{

    public function __construct()
    {
        parent::__construct(
            'custom_friendship_widget',
            __('友情链接', 'your-text-domain'),
            array(
                'description' => __('用于展示友链的自定义小工具', 'your-text-domain'),
            )
        );
    }

    public function widget($args, $instance)
    {
        echo $args['before_widget'];

        if (!empty($instance['title'])) {
            echo $args['before_title'].apply_filters('widget_title', $instance['title']).$args['after_title'];
        }
        if (!empty($instance['f_links'])) {
            echo '<ul class="friend-links">';
            foreach ($instance['f_links'] as $link) {
                echo '<li><a href="'.esc_url($link['url']).'" target="_blank">'.esc_html($link['title']).'</a></li>';
            }
            echo '</ul>';
        }

        echo $args['after_widget'];
    }

    public function form($instance)
    {
        $title = isset($instance['title']) ? esc_attr($instance['title']) : '';
        $f_links = isset($instance['f_links']) ? $instance['f_links'] : array();

        // 将友链数组转换为文本格式（每行“标题|URL”）
        $f_links_text = '';
        foreach ($f_links as $link) {
            $f_links_text .= $link['title'].'|'.$link['url']."\n";
        }

        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('标题:'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>"
                   name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>">
        </p>

        <p>
            <label for="<?php echo $this->get_field_id('f_links'); ?>"><?php _e(
                    '友链列表（每行格式为“标题|URL”）:'
                ); ?></label>
            <textarea class="widefat" rows="5" cols="30" id="<?php echo $this->get_field_id('f_links'); ?>"
                      name="<?php echo $this->get_field_name('f_links'); ?>"><?php echo $f_links_text; ?></textarea>
            <small><?php _e('示例:', 'your-text-domain'); ?> 朋友博客|http://example.com,
                另一个博客|http://anotherblog.com</small>
        </p>
        <?php
    }

    public function update($new_instance, $old_instance)
    {
        $instance = $old_instance;

        // 保存标题
        $instance['title'] = sanitize_text_field($new_instance['title']);

        // 解析友链列表文本
        $f_links_text = trim($new_instance['f_links']);
        $new_f_links = array();
        if (!empty($f_links_text)) {
            $lines = explode(",", $f_links_text);
            foreach ($lines as $line) {
                $parts = explode('|', trim($line));
                if (count($parts) == 2) {
                    $new_f_links[] = array(
                        'title' => sanitize_text_field($parts[0]),
                        'url' => esc_url_raw($parts[1]),
                    );
                }
            }
        }

        // 保存友链数据
        $instance['f_links'] = $new_f_links;

        return $instance;
    }
}


function register_footer_widget()
{
    register_widget('Footer_Info_Widget');
    register_widget('Footer_Contact_Widget');
    register_widget('Custom_Friendship_Widget');
}

add_action('widgets_init', 'register_footer_widget');

class Custom_Walker_Category_Menu extends Walker_Nav_Menu
{

    // 添加递归函数来生成分类树
    private function renderCategoryTree($category, $depth)
    {
        // 新增条件判断，跳过 "Uncategorized" 分类
        if ($category->name === 'Uncategorized') {
            return '';
        }

        $output = '<div class="category-item flex-item">';
        if ($depth === 0) {
            $output .= '<a href="'.get_term_link($category->term_id).'" class="first-level-link">';
        } else {
            $output .= '<a href="'.get_term_link($category->term_id).'">';
        }
        $output .= $category->name.'</a>';

        $children = get_terms([
            'taxonomy' => 'product_cat',
            'parent' => $category->term_id,
            'hide_empty' => false,
        ]);

        if ($children) {
            $output .= '<ul class="subcategories flex-container">';
            foreach ($children as $child) {
                $output .= $this->renderCategoryTree($child, $depth + 1);
            }
            $output .= '</ul>';
        }

        $output .= '</div>';

        return $output;
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        global $wp_query;

        // 初始化缩略图列表数组
        static $thumbnailList = [];

        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $class_names = '';
        $classes = empty($item->classes) ? [] : (array)$item->classes;
        // 在标题为“Product”的菜单项上添加特有类名
        if ($item->title === 'Products') {
            $classes[] = 'menu-item-product'; // 添加新的类名
        }

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="'.esc_attr($class_names).'"';

        $output .= $indent.'<li id="menu-item-'.$item->ID.'"'.$value.$class_names.'>';

        $attributes = !empty($item->attr_title) ? ' title="'.esc_attr($item->attr_title).'"' : '';
        $attributes .= !empty($item->target) ? ' target="'.esc_attr($item->target).'"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="'.esc_attr($item->xfn).'"' : '';
        $attributes .= !empty($item->url) ? ' href="'.esc_attr($item->url).'"' : '';

        $item_output = $args->before;
        $item_output .= '<a'.$attributes.'>';
        $item_output .= $args->link_before.apply_filters('the_title', $item->title, $item->ID).$args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        // 在标题为“商品分类”的菜单项内部添加分类树
        if ($item->title === 'Products') {
            $categories = get_terms([
                'taxonomy' => 'product_cat',
                'parent' => 0,
                'hide_empty' => false,
            ]);
            if ($categories) {
                $category_list = '<div class="dropdown-content"><div class="flex-container">';
                foreach ($categories as $category) {
                    $category_list .= $this->renderCategoryTree($category, 0);

                    if (has_term_meta($category->term_id, '_custom_taxonomy_checkbox', 'yes')) {
                        $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
                        if ($thumbnail_id) {
                            $thumbnailList[] = [
                                'id' => $category->term_id,
                                'thumbnail_url' => wp_get_attachment_image_url($thumbnail_id, 'thumbnail'),
                                'name' => esc_html($category->name),
                            ];
                        }
                    }
                }
                $category_list .= '</div>'; // 关闭分类树的容器
                if (!empty($thumbnailList)) {
                    $thumbnail_html = '<div class="thumbnail-column">';
                    foreach ($thumbnailList as $thumbnailInfo) {
                        $thumbnail_html .= sprintf(
                            '<div class="thumbnail-item"><img src="%s" alt="%s"><span>%s</span></div>',
                            $thumbnailInfo['thumbnail_url'],
                            esc_attr($thumbnailInfo['name']),
                            $thumbnailInfo['name']
                        );
                    }
                    $thumbnail_html .= '</div>'; // 关闭缩略图列表的容器
                    $category_list .= $thumbnail_html;
                }

                // 清空缩略图列表以便下一次使用
                $thumbnailList = [];

                $item_output .= $category_list;
            }
        }


        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}

function add_custom_taxonomy_checkbox($term = null)
{
    $term_id = is_object($term) ? $term->term_id : 0;

    echo '<tr class="form-field">';
    echo '<th scope="row" valign="top">';
    echo '<label for="_custom_taxonomy_checkbox">'.__('在菜单中显示缩略图', 'textdomain').'</label>';
    echo '</th>';
    echo '<td>';
    woocommerce_wp_checkbox(array(
        'id' => '_custom_taxonomy_checkbox',
        'label' => '', // 这里留空，因为我们已经在<th>中设置了标签
        'desc_tip' => true,
        'description' => __('勾选以在菜单中显示此分类的缩略图。', 'textdomain'),
        'value' => $term_id ? get_term_meta($term_id, '_custom_taxonomy_checkbox', true) : '',
    ));
    echo '</td>';
    echo '</tr>';
}

add_action('product_cat_add_form_fields', 'add_custom_taxonomy_checkbox', 10, 1);
add_action('product_cat_edit_form_fields', 'add_custom_taxonomy_checkbox', 10, 1);
function save_custom_taxonomy_checkbox($term_id = 0)
{
    // 如果是新创建的分类，从POST数据中获取term_id
    if (empty($term_id) && isset($_POST['tag_ID'])) {
        $term_id = absint($_POST['tag_ID']);
    }

    if (isset($_POST['_custom_taxonomy_checkbox']) && $term_id) {
        update_term_meta($term_id, '_custom_taxonomy_checkbox', 'yes');
    } else {
        delete_term_meta($term_id, '_custom_taxonomy_checkbox');
    }
}

add_action('edited_product_cat', 'save_custom_taxonomy_checkbox', 10, 1);
add_action('create_product_cat', 'save_custom_taxonomy_checkbox', 10, 1);

function calculate_reading_time($content)
{
    $word_count = str_word_count(strip_tags($content));
    $reading_time = $word_count / 200; // 计算基础阅读时间

    // 如果计算出的阅读时间超过0，则向上取整到最近的整数；否则，默认为1分钟
    return ($reading_time > 0) ? ceil($reading_time) : 1;
}

function create_custom_post_type()
{
    register_post_type(
        'projects',
        array(
            'labels' => array(
                'name' => __('Projects'),
                'singular_name' => __('Project'),
                'add_new_item' => __('Add New Project'),
                'edit_item' => __('Edit Project'),
                'new_item' => __('New Project'),
                'all_items' => __('All Projects'),
                'menu_name' => __('Projects'),
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-portfolio', // 你可以选择一个图标
            'taxonomies' => array('project_categories'), // 让Projects支持现有的分类和标签
        )
    );
    register_taxonomy(
        'project_categories',
        'projects',
        array(
            'label' => __('Categories'),
            'rewrite' => array('slug' => 'project-categories'),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
        )
    );

    register_post_type(
        'faqs',
        array(
            'labels' => array(
                'name' => __('Faqs'),
                'singular_name' => __('Faqs'),
                'add_new_item' => __('Add New Faqs'),
                'edit_item' => __('Edit Faqs'),
                'new_item' => __('New Faqs'),
                'all_items' => __('All Faqs'),
                'menu_name' => __('Faqs'),
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-welcome-learn-more', // 你可以选择一个图标
            'taxonomies' => array('faqs_categories'), // 让Projects支持现有的分类和标签
        )
    );
    register_taxonomy(
        'faqs_categories',
        'faqs',
        array(
            'label' => __('Categories'),
            'rewrite' => array('slug' => 'faqs-categories'),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
        )
    );


    register_post_type(
        'news',
        array(
            'labels' => array(
                'name' => __('News'),
                'singular_name' => __('News'),
                'add_new_item' => __('Add New News'),
                'edit_item' => __('Edit News'),
                'new_item' => __('New News'),
                'all_items' => __('All News'),
                'menu_name' => __('News'),
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-align-right', // 你可以选择一个图标
            'taxonomies' => array('news_categories'), // 让Projects支持现有的分类和标签
        )
    );
    register_taxonomy(
        'news_categories',
        'news',
        array(
            'label' => __('Categories'),
            'rewrite' => array('slug' => 'news-categories'),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
        )
    );
}

add_action('init', 'create_custom_post_type');

function load_projects_by_category()
{
    $categoryId = isset($_POST['categoryId']) ? absint($_POST['categoryId']) : 0;

    if ($categoryId) {
        $args = [
            'post_type' => 'projects',
            'posts_per_page' => -1,
            'tax_query' => [
                [
                    'taxonomy' => 'project_categories', // 更改为你的自定义分类类型
                    'field' => 'term_id',
                    'terms' => $categoryId,
                ],
            ],
        ];
        $cat_query = new WP_Query($args);

        if ($cat_query->have_posts()) {
            ob_start(); // 开始输出缓冲
            while ($cat_query->have_posts()) {
                $cat_query->the_post();
                ?>
                <div class="project-item">
                    <?php if (has_post_thumbnail()) {
                        the_post_thumbnail('medium');
                    } ?>
                    <h3><?php the_title(); ?></h3>
                    <?php the_excerpt(); ?>
                    <!-- 更多项目展示细节 -->
                </div>
                <?php
            }
            wp_reset_postdata();
            $output = ob_get_clean(); // 获取并清除输出缓冲内容
            echo $output;
        } else {
            echo '<p class="empty-container">No projects found for the selected category.</p>';
        }
    }
    wp_die(); // 结束AJAX响应，确保安全性和兼容性
}

add_action('wp_ajax_load_projects_by_category', 'load_projects_by_category'); // 已登录用户
add_action('wp_ajax_nopriv_load_projects_by_category', 'load_projects_by_category'); // 未登录用户

add_action('woocommerce_after_single_product_summary', 'display_contact_form_pattern', 12); // 选择合适的优先级，确保在相关产品之前
add_action('after_contact_info_block', 'display_contact_form_pattern');


function get_pattern_id_by_title($title)
{
    global $wpdb;
    // 查询条件，使用LIKE以匹配标题
    $pattern_id = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} 
             WHERE post_title = %s 
             AND post_type = 'wp_block'",
            $title
        )
    );

    return $pattern_id ? $pattern_id : false;
}

function display_contact_form_pattern()
{
    echo '<div class="product-contact-form" id="prod-contact">';
    $pattern_title = 'Contact Form';
    $pattern_id = get_pattern_id_by_title($pattern_title);

    if ($pattern_id) {
        // 直接查询区块的post_content
        $pattern_content = get_post_field('post_content', $pattern_id);

        // 如果内容存在，则使用输出 buffering 来安全执行潜在的短代码
        if ($pattern_content) {
            ob_start();
            echo apply_filters('the_content', $pattern_content); // 确保短代码在内容中被解析
            $output = ob_get_clean();
            echo $output;
        } else {
            echo "Pattern内容为空。";
        }
    } else {
        echo "未找到名为'Contact Form'的Pattern。";
    }
    echo '</div>';
}


// 添加自定义字段到产品数据表单
add_action('woocommerce_product_options_general_product_data', 'add_custom_product_fields');
function add_custom_product_fields()
{
    // 自定义星级字段（这里假设你已经有方法计算或存储星级，例如通过评价平均值）
    woocommerce_wp_text_input(
        array(
            'id' => '_custom_star_rating',
            'label' => __('自定义星级', 'text-domain'),
            'desc_tip' => true,
            'description' => __('Enter the custom star rating for this product.', 'text-domain'),
            'type' => 'number',
            'custom_attributes' => array(
                'min' => '0',
                'max' => '5',
                'step' => '0.5',
                'placeholder' => __('Enter Rating here', 'text-domain'),
            ),
        )
    );
}

// 保存自定义字段
add_action('woocommerce_process_product_meta', 'save_custom_product_fields');
function save_custom_product_fields($post_id)
{
    $custom_star_rating = isset($_POST['_custom_star_rating']) ? floatval($_POST['_custom_star_rating']) : '';
    update_post_meta($post_id, '_custom_star_rating', $custom_star_rating);
}

function custom_woocommerce_loop_pagination_args($args)
{
    $args['prev_text'] = '&larr; Previous';
    $args['next_text'] = 'Next &rarr;';
    $args['end_size'] = 3;
    $args['mid_size'] = 3;

    return $args;
}

add_filter('woocommerce_loop_pagination_args', 'custom_woocommerce_loop_pagination_args');


// 添加菜单页面到 WordPress 后台
function custom_social_link_menu()
{
    add_menu_page(
        'Social Link', // 页面标题
        'Social Link', // 菜单标题
        'manage_options', // 用户权限
        'social-link', // 路径
        'render_social_link_page', // 回调函数
        'dashicons-admin-links', // 图标
        80 // 位置
    );
}

add_action('admin_menu', 'custom_social_link_menu');


// 渲染后台菜单页面
function render_social_link_page()
{
    ?>
    <div class="wrap">
        <h2>Social Link Settings</h2>
        <!-- 添加表单用于输入和保存社交链接数据 -->
        <form method="post" action="options.php">
            <?php
            settings_fields('social_link_group');
            do_settings_sections('social-link');
            submit_button('Save Settings');
            ?>
        </form>
    </div>
    <?php
}

// 在页面加载时注册并初始化字段
function social_link_settings_init()
{
    register_setting(
        'social_link_group', // 分组
        'social_link_options', // 设置的选项名称
        'sanitize_callback' // 过滤回调函数
    );

    add_settings_section(
        'social_link_section', // 分区名称
        'Social Link Settings', // 分区标题
        '', // 分区内容回调函数
        'social-link' // 页面slug
    );

    add_settings_field(
        'social_links', // 字段ID
        'Social Links', // 字段标题
        'social_links_field', // 字段回调函数
        'social-link', // 页面slug
        'social_link_section' // 分区ID
    );
}

add_action('admin_init', 'social_link_settings_init');

// 回调函数，用于渲染社交链接字段
function social_links_field()
{
    $options = get_option('social_link_options');
    $social_links = isset($options['social_links']) ? $options['social_links'] : '';

    ?>
    <div class="social-links-container">
        <?php
        if (!empty($social_links)) {
            foreach ($social_links as $index => $link) {
                ?>
                <div class="social-link-item">
                    <input type="text" name="social_link_options[social_links][<?php echo $index; ?>][name]"
                           value="<?php echo esc_attr($link['name']); ?>" placeholder="Social Name">
                    <input type="url" name="social_link_options[social_links][<?php echo $index; ?>][url]"
                           value="<?php echo esc_url($link['url']); ?>" placeholder="Social URL">
                    <input type="hidden" class="social-icon-url"
                           name="social_link_options[social_links][<?php echo $index; ?>][icon]"
                           value="<?php echo esc_attr($link['icon']); ?>">
                    <input type="button" class="upload-social-icon button"
                           value="<?php _e('Upload Icon', 'text-domain'); ?>">
                    <div class="social-icon-preview">
                        <?php if (!empty($link['icon'])) : ?>
                            <img src="<?php echo esc_url($link['icon']); ?>" alt="Icon Preview">
                        <?php endif; ?>
                    </div>
                    <button type="button" class="remove-social-link button"><i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                <?php
            }
        }
        ?>
    </div>
    <button type="button" class="add-social-link button"><?php _e('Add Social Link', 'text-domain'); ?></button>
    <?php
}

// 数据过滤回调函数
function sanitize_callback($input)
{
    $output['social_links'] = array();

    if (isset($input['social_links']) && is_array($input['social_links'])) {
        foreach ($input['social_links'] as $link) {
            $output['social_links'][] = array(
                'name' => sanitize_text_field($link['name']),
                'url' => esc_url_raw($link['url']),
                'icon' => esc_url_raw($link['icon']),
            );
        }
    }

    return $output;
}


// 在主题中显示存储的社交链接和图标数据
function display_social_links()
{
    $options = get_option('social_link_options');
    $social_links = isset($options['social_links']) ? $options['social_links'] : '';

    if (!empty($social_links)) {
        // 在前台显示社交链接和图标数据
        echo wp_kses_post($social_links);
    }
}


// 添加必要的后台脚本
function custom_admin_scripts()
{
    wp_enqueue_media(); // 加载媒体库脚本
    wp_enqueue_style('font-awesome', get_template_directory_uri().'/assets/css/fontawesome.all.min.css');

    wp_enqueue_script(
        'custom-admin-script', // 脚本标识符
        get_template_directory_uri().'/js/custom-admin.js', // 脚本文件路径
        array('jquery'), // 确保这里列出了'jquery'作为依赖
        '1.0', // 版本号
        true // 是否在页脚加载
    );
    wp_enqueue_style('custom-backend-style', get_template_directory_uri().'/css/admin.css', false, '1.0', 'all');

    wp_localize_script(
        'custom-admin-script', // 目标脚本标识符
        'customAdmin', // JavaScript 对象名称
        array(
            'uploadIconText' => __('Upload Icon', 'text-domain'), // 传递到 JavaScript 的本地化文本
        )
    );
}

add_action('admin_enqueue_scripts', 'custom_admin_scripts');

function get_social_links()
{
    $options = get_option('social_link_options');
    $social_links = isset($options['social_links']) ? $options['social_links'] : array();

    return $social_links;
}