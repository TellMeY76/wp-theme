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
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php
// 假设全局地址存储在option 'global_address'中，电话号码在'global_phone'中
$address = get_option( 'my_address_setting' );
$phone = get_option( 'my_phone_setting' );

// 同样的，检查地址和电话是否都有值再进行显示
if ( ! empty( $address ) && ! empty( $phone ) ) { ?>
    <div class="header-top-contact">
    	<div class="header-top-contact__content">
			<span class="contact__content-item">
				<i class="contact__content-icon fa-solid fa-location-dot"></i> 
				<b>ADDRESS </b><?php echo esc_html( $address ); ?>
			</span>
			<span class="contact__content-item">
				<i class="contact__content-icon fa-solid fa-phone"></i>
				<b>CALL US </b><?php echo esc_html( $phone ); ?></span>
		</div>
    </div>
<?php } ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'inshow' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			the_custom_logo();
			?>
			<div class="site-title-block">
			<?php
			if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;
			$inshow_description = get_bloginfo( 'description', 'display' );
			if ( $inshow_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $inshow_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; ?>
			</div>
		</div><!-- .site-branding -->

		<div class="menu-search-block">
		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'inshow' ); ?></button>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
		</nav><!-- #site-navigation -->
		<form class="search-form">
			<button type="submit" class="search-submit inShow-submit" aria-label="搜索">
				<i class="fa-solid fa-magnifying-glass"></i>
			</button>
			<input type="search" class="search-field" aria-label="搜索" placeholder="搜索..." value="" name="search">
		</form>
		
		</div>

	</header><!-- #masthead -->
