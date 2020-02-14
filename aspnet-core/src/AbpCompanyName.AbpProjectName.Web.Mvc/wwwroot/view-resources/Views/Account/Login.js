(function () {
    $('#ReturnUrlHash').val(location.hash);

    var _$form = $('#LoginForm');

    _$form.submit(function (e) {
        e.preventDefault();

        if (!_$form.valid()) {
            return;
        }

        abp.ui.setBusy(
            $('body'),

            abp.ajax({
                contentType: 'application/x-www-form-urlencoded',
                url: _$form.attr('action'),
                data: _$form.serialize()
            })
        );
    });
})();
