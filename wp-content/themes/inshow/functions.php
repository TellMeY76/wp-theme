<?php
/**
 * InShow functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package InShow
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function inshow_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on InShow, use a find and replace
		* to change 'inshow' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'inshow', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'inshow' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
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
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'inshow_setup' );


/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function inshow_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'inshow_content_width', 640 );
}
add_action( 'after_setup_theme', 'inshow_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function inshow_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'inshow' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'inshow' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'inshow_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function inshow_scripts() {
	wp_enqueue_style( 'inshow-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'inshow-style', 'rtl', 'replace' );

	wp_enqueue_script( 'inshow-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'inshow_scripts' );


/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// 创建四个自定义小工具区域
if ( function_exists('register_sidebar') ) {
    register_sidebar(array(
        'name'          => __( 'Footer Column 1', 'your-textdomain' ),
        'id'            => 'footer_column_1',
        'description'   => __( 'Widgets in this area will be shown in the first column of the footer.', 'your-textdomain' ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
	register_sidebar(array(
        'name'          => __( 'Footer Column 2', 'your-textdomain' ),
        'id'            => 'footer_column_2',
        'description'   => __( 'Widgets in this area will be shown in the first column of the footer.', 'your-textdomain' ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
	register_sidebar(array(
        'name'          => __( 'Footer Column 3', 'your-textdomain' ),
        'id'            => 'footer_column_3',
        'description'   => __( 'Widgets in this area will be shown in the first column of the footer.', 'your-textdomain' ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h1 class="footer-widget-title">',
        'after_title'   => '</h1>',
    ));
	register_sidebar(array(
        'name'          => __( 'Footer Column 4', 'your-textdomain' ),
        'id'            => 'footer_column_4',
        'description'   => __( 'Widgets in this area will be shown in the first column of the footer.', 'your-textdomain' ),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h1 class="footer-widget-title">',
        'after_title'   => '</h1>',
    ));

    // 重复以上代码三次，分别创建 Footer Column 2、3、4
}


function enqueue_fontawesome() {
    wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/assets/css/fontawesome.all.min.css' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_fontawesome' );

// 可在此处添加更多的自定义功能、过滤器和动作钩子
// 添加自定义字段
function add_custom_settings() {
    register_setting( 'my_custom_settings_group', 'my_address_setting' );
    register_setting( 'my_custom_settings_group', 'my_phone_setting' );
}
add_action( 'admin_init', 'add_custom_settings' );

// 添加设置页面
function custom_admin_menu() {
    add_options_page(
        '地址与联系方式',
        '地址与联系方式',
        'manage_options',
        'contact_settings',
        'custom_contact_settings_page'
    );
}
add_action( 'admin_menu', 'custom_admin_menu' );

// 设置页面显示表单
function custom_contact_settings_page() {
    ?>
    <form method="post" action="options.php">
        <?php settings_fields( 'my_custom_settings_group' ); ?>
        <?php do_settings_sections( 'my_custom_settings_group' ); ?>

        <table class="form-table">
            <tr valign="top">
                <th scope="row">地址</th>
                <td><input type="text" name="my_address_setting" value="<?php echo esc_attr( get_option('my_address_setting') ); ?>" /></td>
            </tr>
            <tr valign="top">
                <th scope="row">电话</th>
                <td><input type="text" name="my_phone_setting" value="<?php echo esc_attr( get_option('my_phone_setting') ); ?>" /></td>
            </tr>
        </table>

        <?php submit_button(); ?>
    </form>
    <?php
}


// 添加自定义函数到主题的functions.php文件中
function custom_woocommerce_single_product_summary_actions() {
    // 移除默认的添加到购物车按钮
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );

    // 添加自定义的添加到购物车按钮或其他内容
    // add_action( 'woocommerce_single_product_summary', 'custom_add_to_cart_button', 30 );
}

add_action( 'init', 'custom_woocommerce_single_product_summary_actions' );

// 自定义添加到购物车按钮的示例函数
function custom_add_to_cart_button() {
    global $product;

    // 您自己的定制代码去渲染新的按钮或者其他内容
    echo '<button type="submit" class="custom-add-to-cart-button button alt">咨询</button>';
}

// 添加产品标题至woocommerce_single_product_summary钩子后面
add_action( 'woocommerce_single_product_summary', 'add_product_title_after_gallery', 5 );
function add_product_title_after_gallery() {
    global $product;
    echo '<h2 class="after-gallery-title">' . get_the_title( $product->get_id() ) . '</h2>';
}

// 移除产品标签
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );

// 移除产品分类（假设分类也在woocommerce_single_product_summary钩子上输出，如果不是请查找对应的钩子）
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_categories', 30 );

// 底部小工具
class Footer_Info_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'footer_info_widget',
            __('Footer Information Widget', 'your-textdomain'),
            ['description' => __('A widget to display site logo, title, subtitle, address and working hours.', 'your-textdomain')]
        );
	}

	public function form( $instance ) {
        // 获取现有图像URL
        $logo_url = ! empty( $instance['logo_url'] ) ? $instance['logo_url'] : '';
        $address = ! empty( $instance['address'] ) ? $instance['address'] : '';
        $officeHour = ! empty( $instance['officeHour'] ) ? $instance['officeHour'] : '';

        // 创建上传按钮和隐藏输入框
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'logo_url' ); ?>"><?php _e( 'Logo Image:', 'your-textdomain' ); ?></label><br>
            <input type="hidden" id="footer_upload_url" name="<?php echo $this->get_field_name( 'logo_url' ); ?>" value="<?php echo esc_url( $logo_url ); ?>">
            <?php
            if ( $logo_url ) {
                echo '<img src="' . esc_url( $logo_url ) . '" id="footer_upload_preview" style="max-width:100%;"/>';
            }
            ?>
            <input type="button" class="button button-secondary" value="<?php _e( 'Upload Image', 'your-textdomain' ); ?>" id="footer_upload_btn">
        </p>
        
        <!-- 地址和工作时间的输入框 -->
        <p>
            <label for="<?php echo $this->get_field_id('address'); ?>"><?php _e('联系地址:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('address'); ?>" name="<?php echo $this->get_field_name('address'); ?>" value="<?php echo esc_html($address); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('officeHour'); ?>"><?php _e('工作时间:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('officeHour'); ?>" name="<?php echo $this->get_field_name('officeHour'); ?>" value="<?php echo esc_html($officeHour); ?>">
        </p>
        <?php
        // 直接在form内部添加JavaScript，确保DOM加载完成后再执行
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            jQuery(document).on('click', '#footer_upload_btn', function(e) {
                e.preventDefault();
                var frame = wp.media({
                    title: '<?php _e( 'Select or Upload an Image', 'your-textdomain' ); ?>',
                    library: { type: 'image' },
                    button: { text: '<?php _e( 'Use Image', 'your-textdomain' ); ?>' },
                    multiple: false  // 设置为单选模式
                });

                frame.on('select', function() {
                    var attachment = frame.state().get('selection').first().toJSON();
					$logo_url = attachment.url
                    jQuery('#footer_upload_url').val(attachment.url);
                    // 更新预览图像
                    jQuery('#footer_upload_preview').attr('src', attachment.url);
                });

                frame.open();
            });
        });
        </script>
        <?php
    }


	// 更新保存表单数据
	public function update($newInstance, $oldInstance) {
		$newInstance = wp_parse_args((array)$newInstance, [
			'address' => '',
			'officeHour' => '',
			'logo_url' => ''
		]);
	
		// Sanitize inputs
		$newInstance['address'] = sanitize_text_field($newInstance['address']);
		$newInstance['officeHour'] = sanitize_text_field($newInstance['officeHour']);
		
		$newInstance['logo_url'] = esc_url_raw($newInstance['logo_url']);
		return $newInstance;
	}

	// 在小工具中渲染数据
	public function widget($args, $instance) {
		extract($args);
		$logo_url = apply_filters('widget_logo_url', $instance['logo_url']);
		$title = get_bloginfo( 'name', 'display' );
		$sub_title = get_bloginfo( 'description', 'display' );
		$address = apply_filters('widget_address', $instance['address']);
		$officeHour = apply_filters('widget_officeHour', $instance['officeHour']);
	
		echo $before_widget;
		?>
		<div class="footer-widget footer-info-widget">
			<div class="site-branding">
				<?php if (!empty($logo_url)) : ?>
		            <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
		        <?php endif; ?>
				<div class="site-title-block">
					<?php if (!empty($title)) : ?>
						<h1 class="site-title"><?php echo esc_html($title); ?></h1>
					<?php endif; ?>

					<?php if (!empty($sub_title)) : ?>
						<p  class="site-description"><?php echo esc_html($sub_title); ?></p>
					<?php endif; ?>
				</div>
			</div>
		
			<!-- 地址和工作时间等 -->
			<?php if (!empty($address)) : ?>
				<h2>Adress</h2>
				<p><?php echo esc_html($address); ?></p>
			<?php endif; ?>

			<?php if (!empty($officeHour)) : ?>
				<h2>Office Hour</h2>
				<p><?php echo esc_html($officeHour); ?></p>
			<?php endif; ?>
	
			<?php // 根据实例化数据填充内容 ?>
		</div>
		<?php
		echo $after_widget;
	}
}

class Footer_Contact_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'footer_contact_widget',
            __('Footer Contact Widget', 'your-textdomain'),
            ['description' => __('A widget to display  phone, customer service, service center', 'your-textdomain')]
        );
	}

	public function form( $instance ) {
        // 获取现有图像URL
        $phone = ! empty( $instance['phone'] ) ? $instance['phone'] : '';
        $service_center = ! empty( $instance['service_center'] ) ? $instance['service_center'] : '';
        $customer_service = ! empty( $instance['customer_service'] ) ? $instance['customer_service'] : '';

        ?>
        
        <!-- 地址和工作时间的输入框 -->
        <p>
            <label for="<?php echo $this->get_field_id('phone'); ?>"><?php _e('phone:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('Phone'); ?>" name="<?php echo $this->get_field_name('phone'); ?>" value="<?php echo esc_html($phone); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('service_center'); ?>"><?php _e('Service Center:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('service_center'); ?>" name="<?php echo $this->get_field_name('service_center'); ?>" value="<?php echo esc_html($service_center); ?>">
        </p>
		<p>
            <label for="<?php echo $this->get_field_id('customer_service'); ?>"><?php _e('Customer Service:', 'your-textdomain'); ?></label>
            <input type="text" class="widefat" id="<?php echo $this->get_field_id('customer_service'); ?>" name="<?php echo $this->get_field_name('customer_service'); ?>" value="<?php echo esc_html($customer_service); ?>">
        </p>
        <?php
        // 直接在form内部添加JavaScript，确保DOM加载完成后再执行
        ?>
        <?php
    }


	// 更新保存表单数据
	public function update($newInstance, $oldInstance) {
		$newInstance = wp_parse_args((array)$newInstance, [
			'phone' => '',
			'service_center' => '',
			'customer_service' => ''
		]);
	
		// Sanitize inputs
		$newInstance['phone'] = sanitize_text_field($newInstance['phone']);
		$newInstance['service_center'] = sanitize_text_field($newInstance['service_center']);
		$newInstance['customer_service'] = sanitize_text_field($newInstance['customer_service']);
		return $newInstance;
	}

	// 在小工具中渲染数据
	public function widget($args, $instance) {
		extract($args);
		$phone = apply_filters('widget_phone', $instance['phone']);
		$service_center = apply_filters('widget_service_center', $instance['service_center']);
		$customer_service = apply_filters('widget_customer_service', $instance['customer_service']);
	
		echo $before_widget;
		?>
		<div class="footer-widget footer-contact-widget">

			<h1 class="footer-widget-title">Get in touch</h1>
			<div class="footer-contact-widget_block">
				<?php if (!empty($phone)) : ?>
					<h2>Phone</h2>
					<p><?php echo esc_html($phone); ?></p>
				<?php endif; ?>
			</div>
		
			<div class="footer-contact-widget_block">
				<?php if (!empty($service_center)) : ?>
					<h2>Service Center</h2>
					<p><?php echo esc_html($service_center); ?></p>
				<?php endif; ?>
			</div>

			<div class="footer-contact-widget_block">
				<?php if (!empty($customer_service)) : ?>
					<h2>Customer Service</h2>
					<p><?php echo esc_html($customer_service); ?></p>
				<?php endif; ?>
			</div>
	
			<?php // 根据实例化数据填充内容 ?>
		</div>
		<?php
		echo $after_widget;
	}
}

/**
 * 自定义小工具：友情链接
 */
class Custom_Friendship_Widget extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'custom_friendship_widget',
            __( '友情链接', 'your-text-domain' ),
            array(
                'description' => __( '用于展示友链的自定义小工具', 'your-text-domain' ),
            )
        );
    }

    public function widget( $args, $instance ) {
        echo $args['before_widget'];

        if ( ! empty( $instance['title'] ) ) {
            echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
        }
        if ( ! empty( $instance['f_links'] ) ) {
            echo '<ul class="friend-links">';
            foreach ( $instance['f_links'] as $link ) {
                echo '<li><a href="' . esc_url( $link['url'] ) . '" target="_blank">' . esc_html( $link['title'] ) . '</a></li>';
            }
            echo '</ul>';
        }

        echo $args['after_widget'];
    }

    public function form( $instance ) {
        $title = isset( $instance['title'] ) ? esc_attr( $instance['title'] ) : '';
        $f_links = isset( $instance['f_links'] ) ? $instance['f_links'] : array();

        // 将友链数组转换为文本格式（每行“标题|URL”）
        $f_links_text = '';
        foreach ( $f_links as $link ) {
            $f_links_text .= $link['title'] . '|' . $link['url'] . "\n";
        }

        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( '标题:' ); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>">
        </p>

        <p>
            <label for="<?php echo $this->get_field_id( 'f_links' ); ?>"><?php _e( '友链列表（每行格式为“标题|URL”）:' ); ?></label>
            <textarea class="widefat" rows="5" cols="30" id="<?php echo $this->get_field_id( 'f_links' ); ?>" name="<?php echo $this->get_field_name( 'f_links' ); ?>"><?php echo $f_links_text; ?></textarea>
            <small><?php _e( '示例:', 'your-text-domain' ); ?> 朋友博客|http://example.com, 另一个博客|http://anotherblog.com</small>
        </p>
        <?php
    }

    public function update( $new_instance, $old_instance ) {
        $instance = $old_instance;

        // 保存标题
        $instance['title'] = sanitize_text_field( $new_instance['title'] );

        // 解析友链列表文本
        $f_links_text = trim( $new_instance['f_links'] );
        $new_f_links = array();
        if ( ! empty( $f_links_text ) ) {
            $lines = explode( ",", $f_links_text );
            foreach ( $lines as $line ) {
                $parts = explode( '|', trim( $line ) );
                if ( count( $parts ) == 2 ) {
                    $new_f_links[] = array(
                        'title' => sanitize_text_field( $parts[0] ),
                        'url' => esc_url_raw( $parts[1] ),
                    );
                }
            }
        }

        // 保存友链数据
        $instance['f_links'] = $new_f_links;

        return $instance;
    }
}


function register_footer_widget() {
    register_widget( 'Footer_Info_Widget' );
	register_widget( 'Footer_Contact_Widget' );
    register_widget( 'Custom_Friendship_Widget' );
}
add_action( 'widgets_init', 'register_footer_widget' );

function theme_enqueue_scripts() {
    wp_enqueue_script('qna-accordion', get_template_directory_uri() . '/js/qna-accordion.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');