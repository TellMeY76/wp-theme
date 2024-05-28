(function ($) {

    $(document).ready(function() {
        $('#'+footerInfoWidgetData.uploadImageButtonId).click(function(e) {
            e.preventDefault();
            var send_attachment_bkp = wp.media.editor.send.attachment;
            var file_frame = wp.media({
                title: "<?php _e( 'Select or Upload an Image', 'your-textdomain' ); ?>",
                library: { type: 'image' },
                button: { text: "<?php _e( 'Use Image', 'your-textdomain' ); ?>" },
                multiple: false  // 设置为单选模式            
            });

            // ... 其余相同的媒体库选择回调 ...
            file_frame.on('select', function() {
                var attachment = file_frame.state().get('selection').first().toJSON();
                $("#<?php echo $this->get_field_id( 'logo_url' ); ?>").val(attachment.url);
                // 更新预览图像（如果有的话）
                $("#<?php echo $this->get_field_id( 'logo_preview' ); ?>").attr('src', attachment.url);
            });

            // 打开媒体库或上传窗口
            file_frame.open();
            return false;
        });
    });
})(jQuery);
