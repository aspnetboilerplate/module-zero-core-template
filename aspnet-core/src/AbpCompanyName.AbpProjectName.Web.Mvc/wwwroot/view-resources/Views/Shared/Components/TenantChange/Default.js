(function () {
    $('.tenant-change-component a')
        .click(function (e) {
            e.preventDefault();
            abp.ajax({
                url: abp.appPath + 'Account/TenantChangeModal',
                type: 'POST',
                dataType: 'html',
                success: function (content) {
                    $('#TenantChangeModal div.modal-content').html(content);
                },
                error: function (e) { }
            });
        });
})();
