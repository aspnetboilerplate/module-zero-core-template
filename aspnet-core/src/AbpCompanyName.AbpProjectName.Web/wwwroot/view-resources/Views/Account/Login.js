(function () {

    $(function () {
        $('#LoginButton').click(function (e) {
            e.preventDefault();
            var $loginForm = $('#LoginForm');
            
            abp.ui.setBusy(
                $('#LoginArea'),
                
                abp.ajax({
                    contentType: 'application/x-www-form-urlencoded',
                    url: $loginForm.attr('action'),
                    data: $loginForm.serialize()
                })
            );
        });

        $('a.social-login-link').click(function () {
            var $a = $(this);
            var $form = $a.closest('form');
            $form.find('input[name=provider]').val($a.attr('data-provider'));
            $form.submit();
        });

        $('#ReturnUrlHash').val(location.hash);

        $('#LoginForm input:first-child').focus();
    });

})();