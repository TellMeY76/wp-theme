<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

?>
<?php
$global_settings = get_option('gspb_global_settings');
$current_localfonts = !empty($global_settings['localfont']) ? json_decode($global_settings['localfont'], true) : [];
$count = !empty($current_localfonts) ? count($current_localfonts) : 1;
?>
<form enctype="multipart/form-data" method="POST" class="greenshift_form greenshift_form__general">
	<?php wp_nonce_field('gspb_settings_page_action', 'gspb_settings_field'); ?>

	<div class="fonts-wrap">
		<?php
		$i = 1;
		if (!empty($current_localfonts)) {
			foreach ($current_localfonts as $name => $options) {
				require GREENSHIFT_DIR_PATH . 'templates/admin/settings_general_font_item.php';
				$i++;
			}
		} else {
			require GREENSHIFT_DIR_PATH . 'templates/admin/settings_general_font_item.php';
		} ?>
	</div>

	<input type="hidden" name="fonts_count" value="<?php echo (int)$count ?>">

	<div style="display:flex; gap:10px; margin-top:30px">
		<button class="button-secondary add-new-font">
			<?php esc_html_e('Add New Font', 'greenshift-animation-and-page-builder-blocks') ?>
		</button>
		<input type="submit" name="gspb_save_settings_general" value="<?php esc_html_e('Save', 'greenshift-animation-and-page-builder-blocks') ?>" class="button button-primary button-large">
	</div>
	
</form>