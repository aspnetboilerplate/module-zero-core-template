(function ($) {
    var _auditLogService = abp.services.app.auditLog,
        l = abp.localization.getSource('OA'),
        _$table = $('#AuditLogsTable');

    var _$auditLogsTable = _$table.DataTable({
        paging: true,
        serverSide: true,
        ajax: function (data, callback, settings) {
            var filter = $('#AuditLogsSearchForm').serializeFormToObject(true);
            filter.maxResultCount = data.length;
            filter.skipCount = data.start;

            abp.ui.setBusy(_$table);
            _auditLogService.getAll(filter).done(function (result) {
                callback({
                    recordsTotal: result.totalCount,
                    recordsFiltered: result.totalCount,
                    data: result.items
                });
            }).always(function () {
                abp.ui.clearBusy(_$table);
            });
        },
        buttons: [
            {
                name: 'refresh',
                text: '<i class="fas fa-redo-alt"></i>',
                action: () => _$auditLogsTable.draw(false)
            }
        ],
        responsive: {
            details: {
                type: 'column'
            }
        },
        columnDefs: [
            {
                targets: 0,
                className: 'control',
                defaultContent: '',
            },
            {
                targets: 1,
                data: 'executionTime',
                sortable: true
            },
            {
                targets: 2,
                data: 'userName',
                sortable: true
            },
            {
                targets: 3,
                data: 'serviceName',
                sortable: true
            },
            {
                targets: 4,
                data: 'methodName',
                sortable: true
            },
            {
                targets: 5,
                data: 'executionDuration',
                sortable: true
            },
            {
                targets: 6,
                data: 'clientIpAddress',
                sortable: true
            },
            {
                targets: 7,
                data: 'clientName',
                sortable: true
            },
            {
                targets: 8,
                data: 'browserInfo',
                sortable: true
            }
        ]
    });

    $('.btn-search').on('click', (e) => {
        _$auditLogsTable.ajax.reload();
    });

    $('.txt-search').on('keypress', (e) => {
        if (e.which == 13) {
            _$auditLogsTable.ajax.reload();
            return false;
        }
    });
})(jQuery);
