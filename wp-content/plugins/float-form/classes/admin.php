<?php

class FloatFormAdmin {

    public static function init() {
        add_action('admin_menu', array( 'FloatFormAdmin', 'add_admin_menu' ));

        add_action( 'admin_init', array( 'FloatFormAdmin', 'plugin_settings' ));
    }

    public static function plugin_settings() {
        register_setting( 'option_group_float_form', 'float_form_shortcode_option', 'sanitize_callback' );
        register_setting( 'option_group_float_form', 'custom_float_form_fixed_css', 'sanitize_callback' );
    }

    public static function add_admin_menu() {
        add_menu_page(
            'FloatForm',
            'FloatForm Options',
            'manage_options',
            'float_form',
            array( 'FloatFormAdmin', 'front_form_options_page_html' ),
        );
    }

    public static function front_form_options_page_html() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <form action="options.php" method="post">
                <?php
                // output security fields for the registered setting "wporg_options"
                settings_fields( 'option_group_float_form' );
                // output setting sections and their fields
                // (sections are registered for "wporg", each field is registered to a specific section)
                do_settings_sections( 'float_form' );
                ?>

                <table class="float-form-admin-options-table">
                    <tr valign="top">
                        <th scope="row">
                            <label for="float_form_shortcode_option">Form Shortcode</label>
                        </th>
                        <td>
                            <input type="text" id="float_form_shortcode_option" name="float_form_shortcode_option" value="<?php echo esc_attr( get_option( 'float_form_shortcode_option' ) ); ?>" />
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">
                            <label for="custom_float_form_fixed_css">Fixed Element Css</label>
                        </th>
                        <td>
                            <textarea id="custom_float_form_fixed_css" name="custom_float_form_fixed_css" rows="5" cols="30"><?php echo esc_textarea( get_option( 'custom_float_form_fixed_css' ) ); ?></textarea>
                            <p>This Fixed Element Class Name is '.float-form-fixed'</p>
                        </td>
                    </tr>
                </table>

                <?php
                // output save settings button
                submit_button( 'Save Settings' );
                ?>
            </form>
        </div>
        <?php
    }

}
