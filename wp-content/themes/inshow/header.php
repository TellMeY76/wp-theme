<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package InShow
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php
    // 假设全局地址存储在option 'global_address'中，电话号码在'global_phone'中
    $address = get_option('my_address_setting');
    $phone = get_option('my_phone_setting');

    // 同样的，检查地址和电话是否都有值再进行显示
    if (!empty($address) && !empty($phone)) { ?>
        <div class="header-top-contact">
            <div class="header-top-contact__content">
			<span class="contact__content-item">
				<i class="contact__content-icon fa-solid fa-location-dot"></i> 
				<b>ADDRESS </b><?php echo esc_html($address); ?>
			</span>
                <span class="contact__content-item">
				<i class="contact__content-icon fa-solid fa-phone"></i>
				<b>CALL US </b><?php echo esc_html($phone); ?></span>
            </div>
        </div>
    <?php } ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'inshow'); ?></a>

    <header id="masthead" class="site-header">
        <div class="site-branding">
            <?php
            the_custom_logo();
            ?>
            <div class="site-title-block">
                <?php
                if (is_front_page() && is_home()) :
                    ?>
                    <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo(
                                'name'
                            ); ?></a></h1>
                <?php
                else :
                    ?>
                    <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo(
                                'name'
                            ); ?></a></p>
                <?php
                endif;
                $inshow_description = get_bloginfo('description', 'display');
                if ($inshow_description || is_customize_preview()) :
                    ?>
                    <p class="site-description"><?php echo $inshow_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?></p>
                <?php endif; ?>
            </div>
        </div><!-- .site-branding -->

        <div class="menu-search-block">
            <nav id="site-navigation" class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e(
                        'Primary Menu',
                        'inshow'
                    ); ?></button>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'menu-1',
                        'menu_id' => 'primary-menu',
                        'walker' => new Custom_Walker_Category_Menu(),
                    )
                );
                //            echo do_shortcode('[language-switcher]');
                ?>
            </nav><!-- #site-navigation -->
            <form role="search" method="get" class="search-form"
                  action="<?php echo esc_url(home_url('/')); ?>">
                <input type="hidden" name="post_type" value="product"> <!-- 设置搜索结果限制在商品中 -->
                <button type="submit" class="search-submit inShow-submit" aria-label="搜索">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input type="search" class="search-field"
                       placeholder="<?php echo esc_attr_x('搜索...', 'placeholder'); ?>"
                       value="<?php echo get_search_query(); ?>" name="s"/>
            </form>


        </div>

    </header><!-- #masthead -->
