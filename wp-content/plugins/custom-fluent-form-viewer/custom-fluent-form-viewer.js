jQuery(document).ready(function ($) {
    var formIdInput = $('#form-id');
    var formDataDiv = $('#form-data');
    var initialFormId = typeof window.initialFormId !== 'undefined' ? window.initialFormId : null;

    // 页面加载时尝试从用户元数据自动填充并查询form_id
    if (initialFormId) {
        formIdInput.val(initialFormId);
        loadFormData('form_id=' + initialFormId);
    }

    // 提交表单的事件处理保持不变
    $('#form-id-input-form').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        loadFormData(formData);
    });

    // 加载表单数据的通用函数
    function loadFormData(formData) {
        $.ajax({
            type: 'POST',
            url: ajax_object.ajaxurl,
            data: formData + '&action=load_form_data',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    formDataDiv.html(response.data);
                } else {
                    alert(response.message);
                    console.log('response', response);
                    formDataDiv.html('<p>Error: ' + response.message + '</p>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            }
        });
    }
});