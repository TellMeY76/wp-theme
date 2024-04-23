<?php

class FloatFormFront {

    public static function init() {
        if (!is_admin()) {
            add_action( 'wp_footer', array( 'FloatFormFront', 'theme_float_form_add'), 0);
        }

        add_action('wp_enqueue_scripts', array('FloatFormFront', 'load_scripts'));

    }

    public static function load_scripts() {
        wp_register_style('float_form_styles', FLOAT_FORM_PLUGIN_URL. 'assets/css/float-form-style.css', array(), FLOAT_FORM_VERSION);
        wp_enqueue_style('float_form_styles');

        wp_register_script('float_form_script', FLOAT_FORM_PLUGIN_URL . 'assets/js/float-form-script.js', array('jquery'), FLOAT_FORM_VERSION, true);
        wp_enqueue_script('float_form_script');

        wp_localize_script(
            'float_form_script',
            'my_ajax_obj',
            array(
                'ajax_url' => admin_url( 'admin-ajax.php' ),
                'nonce'    => wp_create_nonce( 'title_example' ),
                'assets_url' => FLOAT_FORM_PLUGIN_URL
            )
        );
    }

    public static function theme_float_form_add() {
        ?>
        <style>
            <?php echo get_option( 'custom_float_form_fixed_css' ) ?>
        </style>
        <div id="float-form-front-content">
            <?php echo do_shortcode(get_option( 'float_form_shortcode_option' )) ?>
        </div>
        <?php
    }
}
