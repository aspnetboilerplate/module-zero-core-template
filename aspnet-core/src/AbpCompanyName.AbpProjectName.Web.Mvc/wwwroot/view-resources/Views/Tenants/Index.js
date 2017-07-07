(function () {
    $(function () {

        var _tenantService = abp.services.app.tenant;
        var _$modal = $('#TenantCreateModal');
        var _$form = _$modal.find('form');

        _$form.validate();

        $('#RefreshButton').click(function () {
            refreshTenantList();
        });

        $('.delete-tenant').click(function () {
            var tenantId = $(this).attr("data-tenant-id");
            var tenancyName = $(this).attr('data-tenancy-name');

            deleteTenant(tenantId, tenancyName);
        });

        $('.edit-tenant').click(function (e) {
            var tenantId = $(this).attr("data-tenant-id");

            e.preventDefault();
            $.ajax({
                url: abp.appPath + 'Tenants/EditTenantModal?tenantId=' + tenantId,
                type: 'POST',
                contentType: 'application/html',
                success: function (content) {
                    $('#TenantEditModal div.modal-content').html(content);
                },
                error: function (e) { }
            });
        });

        _$form.find('button[type="submit"]').click(function (e) {
            e.preventDefault();

            if (!_$form.valid()) {
                return;
            }

            var tenant = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js

            abp.ui.setBusy(_$modal);
            _tenantService.create(tenant).done(function () {
                _$modal.modal('hide');
                location.reload(true); //reload page to see new tenant!
            }).always(function () {
                abp.ui.clearBusy(_$modal);
            });
        });

        _$modal.on('shown.bs.modal', function () {
            _$modal.find('input:not([type=hidden]):first').focus();
        });

        function refreshTenantList() {
            location.reload(true); //reload page to see new tenant!
        }

        function deleteTenant(tenantId, tenancyName) {
            abp.message.confirm(
                "Delete tenant '" + tenancyName + "'?",
                function (isConfirmed) {
                    if (isConfirmed) {
                        _tenantService.delete({
                            id: tenantId
                        }).done(function () {
                            refreshTenantList();
                        });
                    }
                }
            );
        }
    });
})();