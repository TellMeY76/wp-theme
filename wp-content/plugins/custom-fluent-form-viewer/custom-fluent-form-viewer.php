<?php
/*
Plugin Name: Custom Fluent Form Data Viewer
Description: Display form submissions by entering the form ID directly on a custom admin page.
Version: 1.0
Author: ww
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

global $wpdb; // 引入wpdb全局变量用于数据库操作

// 创建后台菜单
function custom_fluent_form_viewer_page()
{
    add_menu_page(
        'Form Data Viewer',
        'Contact',
        'manage_options',
        'custom_fluent_form_viewer',
        'render_form_data_viewer_page',
        'dashicons-email-alt',
        6
    );
}
add_action('admin_menu', 'custom_fluent_form_viewer_page');

// 渲染后台页面
function render_form_data_viewer_page()
{
    // 获取当前用户ID
    $userId = get_current_user_id();
    // 从用户元数据中获取上次的form_id
    $lastFormId = get_user_meta($userId, 'custom_form_viewer_last_form_id', true);

    ?>
    <script>
        // 设置初始的form_id和用户ID为JavaScript变量
        var initialFormId = <?php echo json_encode($lastFormId); ?>;
        var currentUserId = <?php echo json_encode($userId); ?>;
    </script>

    <div class="wrap">
        <h1>View Form Submissions</h1>
        <form id="form-id-input-form">
            <label for="form-id">Enter Form Id:</label>
            <input type="text" id="form-id" name="form_id" value="<?php echo esc_attr($lastFormId); ?>">
            <button type="submit">Load Data</button>
        </form>
        <div id="form-data"></div>
    </div>
    <?php
    // 添加JavaScript文件并传递必要的数据
    wp_enqueue_script(
        'custom-fluent-form-viewer-js',
        plugin_dir_url(__FILE__) . 'custom-fluent-form-viewer.js',
        array('jquery'),
        '1.0',
        true
    );
    wp_localize_script('custom-fluent-form-viewer-js', 'ajax_object', array('ajaxurl' => admin_url('admin-ajax.php')));
}

// 从数据库获取表单提交数据
function get_form_submissions_by_id($form_id) {
    global $wpdb;

    $table_name = $wpdb->prefix . 'fluentform_submissions';

    // 查询表单提交数据，注意这里未使用预处理语句，实际应用中应根据具体情况调整以防止SQL注入
    $results = $wpdb->get_results("SELECT * FROM $table_name WHERE form_id = $form_id ORDER BY id DESC");

    return $results;
}

// 处理Ajax请求
add_action('wp_ajax_nopriv_load_form_data', 'load_form_data');
add_action('wp_ajax_load_form_data', 'load_form_data');

function load_form_data()
{
    $form_id = sanitize_text_field($_POST['form_id']);

    if (!is_numeric($form_id)) {
        echo json_encode(array('success' => false, 'message' => 'Invalid form ID.'));
        wp_die();
    }

    // 从数据库中获取表单提交数据
    $submissions = get_form_submissions_by_id($form_id);

    if (empty($submissions)) {
        echo json_encode(array('success' => true, 'data' => '<p>No submissions found for this form.</p>'));
        wp_die();
    }

    if (!is_wp_error($submissions)) {
        // 如果有有效的提交数据，更新当前用户元数据
        update_user_meta(get_current_user_id(), 'custom_form_viewer_last_form_id', $form_id);
    }

    // 准备输出数据
    $output = '<table><tr><th>Date</th><th>Name</th><th>Email</th><th>Inquiry Type</th><th>Question</th><th>Product Name</th></tr>';
    foreach ($submissions as $entry) {
        $decodedResponse = json_decode($entry->response, true); // 解码response字段

        if (json_last_error() !== JSON_ERROR_NONE) { // 检查解码是否成功
            echo json_encode(array('success' => false, 'message' => 'Error decoding response data.'));
            wp_die();
        }
//        echo json_encode(array('success' => true, 'data' => $decodedResponse));

        $output .= '<tr>';
        $output .= '<td>' . date('Y-m-d', strtotime($entry-> created_at)) . '</td>';
        // 假设字段1和字段2的键名，根据实际数据库结构调整
        $output .= '<td>' . (isset($decodedResponse['input_text']) ? $decodedResponse['input_text'] : '-') . '</td>';
        $output .= '<td>' . (isset($decodedResponse['email']) ? $decodedResponse['email'] : '-') . '</td>';
        $output .= '<td>' . (isset($decodedResponse['dropdown']) ? $decodedResponse['dropdown'] : '-') . '</td>';
        $output .= '<td>' . (isset($decodedResponse['description']) ? $decodedResponse['description'] : '-') . '</td>';
        $output .= '<td>' . (isset($decodedResponse['input_text_2']) ? $decodedResponse['input_text_2'] : '-') . '</td>';

        $output .= '</tr>';
    }
    $output .= '</table>';
    echo json_encode(array('success' => true, 'data' => $output));
    wp_die();
}

// 确保仅在插件激活时注册脚本和样式，避免在每个管理页面加载
if (is_admin()) {
    add_action('admin_init', 'register_custom_scripts');
    add_action('admin_enqueue_scripts', 'register_custom_styles');

}

function register_custom_scripts() {
    wp_register_script(
        'custom-fluent-form-viewer-js',
        plugin_dir_url(__FILE__) . 'custom-fluent-form-viewer.js',
        array('jquery'),
        '1.0',
        true
    );
}

function register_custom_styles() {
    wp_enqueue_style('custom-fluent-form-viewer-style', plugin_dir_url(__FILE__) . 'custom-fluent-form-viewer.css', array(), '1.0', 'all');
}
?>