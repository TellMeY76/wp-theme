<?php
// if uninstall.php is not called by WordPress, die
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    die;
}

$float_form_shortcode_option = 'float_form_shortcode_option';

delete_option( $float_form_shortcode_option );

// for site options in Multisite
delete_site_option( $float_form_shortcode_option );

$custom_float_form_fixed_css = 'custom_float_form_fixed_css';

delete_option( $custom_float_form_fixed_css );

// for site options in Multisite
delete_site_option( $custom_float_form_fixed_css );

unregister_setting( 'option_group_float_form', $float_form_shortcode_option );
unregister_setting( 'option_group_float_form', $custom_float_form_fixed_css );
