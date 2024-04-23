<?php
/*
 * Plugin Name: Float Form
 * Description: A Float Form Plugin
 * Version: 0.0.1
 * Author: Seele
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * License: GNU General Public License v3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('FLOAT_FORM_VERSION', '0.0.1');
define('FLOAT_FORM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLOAT_FORM_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once(FLOAT_FORM_PLUGIN_DIR . 'classes/front.php');
add_action('init', array('FloatFormFront', 'init'));

if (is_admin() || (defined('WP_CLI') && WP_CLI)) {
    require_once(FLOAT_FORM_PLUGIN_DIR . 'classes/admin.php');
    add_action('init', array('FloatFormAdmin', 'init'));
}
