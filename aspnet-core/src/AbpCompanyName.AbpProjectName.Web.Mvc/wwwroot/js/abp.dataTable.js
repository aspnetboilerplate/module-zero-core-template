var abp = abp || {};
(function () {
    if (!$.fn.dataTable) {
        return;
    }

    abp.event.on('abp.dynamicScriptsInitialized', (item) => {
        const l = abp.localization.getSource("AbpProjectName");
        
        const language = {
            emptyTable: "No data available in table",
            info: `${l('TotalRecordsCount','_TOTAL_')}`, // default = _START_-_END_ of _TOTAL_ items
            infoEmpty: "No records",
            infoFiltered: "(filtered from _MAX_ total entries)",
            infoPostFix: "",
            infoThousands: ",",
            lengthMenu: "Show _MENU_ entries",
            loadingRecords: "Loading...",
            processing: '<i class="fas fa-refresh fa-spin"></i>',
            search: "Search:",
            zeroRecords: "No matching records found",
            paginate: {
                first: '<i class="fas fa-angle-double-left"></i>',
                last: '<i class="fas fa-angle-double-right"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
                previous: '<i class="fas fa-chevron-left"></i>'
            },
            aria: {
                sortAscending: ": activate to sort column ascending",
                sortDescending: ": activate to sort column descending"
            }
        };

        $.extend(true, $.fn.dataTable.defaults, {
            searching: false,
            ordering: false,
            language: language,
            processing: true,
            autoWidth: false,
            responsive: true,
            dom: [
                "t",
                "<'card-footer bg-light border-top'",
                "<'row'",
                "<'col-sm-4 col-12 text-sm-left text-center'B>",
                "<'col-sm-4 col-12 text-center'i>",
                "<'col-sm-4 col-12'",
                "<'float-sm-right m-auto'p>",
                ">",
                ">",
                ">"
            ].join('')
        });
    });
})();
