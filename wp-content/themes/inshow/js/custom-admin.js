console.log('jQuery loaded:', typeof jQuery !== 'undefined' ? 'Yes' : 'No');

jQuery(document).ready(function($) {
    $('.add-social-link').on('click', function() {
        console.log('add-social-link click')
        var index = $('.social-link-item').length;
        $('.social-links-container').append(`
                    <div class="social-link-item">
                        <input type="text" name="social_link_options[social_links][${index}][name]" placeholder="Social Name">
                        <input type="url" name="social_link_options[social_links][${index}][url]" placeholder="Social URL">
                        <input type="hidden" class="social-icon-url" name="social_link_options[social_links][${index}][icon]" value="">
                        <input type="button" class="upload-social-icon button" value="Upload Icon">
                        <div class="social-icon-preview"></div>
                        <button type="button" class="remove-social-link button"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                `);
    });

    $(document).on('click', '.remove-social-link', function() {
        $(this).closest('.social-link-item').remove();
    });

    $(document).on('click', '.upload-social-icon', function(e) {
        e.preventDefault();
        var iconField = $(this).siblings('.social-icon-url');
        var previewContainer = $(this).siblings('.social-icon-preview');

        var customUploader = wp.media({
            title: 'Select Icon',
            button: {text: 'Select'}
        });

        customUploader.on('select', function() {
            var attachment = customUploader.state().get('selection').first().toJSON();
            iconField.val(attachment.url);
            previewContainer.html('<img src="' + attachment.url + '" alt="Icon Preview">');
        });

        customUploader.open();
    });
});