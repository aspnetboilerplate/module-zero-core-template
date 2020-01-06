(function () {
    var _$form = $('#RegisterForm');

    $.validator.addMethod("customUsername", function (value, element) {
        if (value === _$form.find('input[name="EmailAddress"]').val()) {
            return true;
        }

        //Username can not be an email address (except the email address entered)
        return !$.validator.methods.email.apply(this, arguments);
    }, abp.localization.localize("RegisterFormUserNameInvalidMessage", "AbpProjectName"));

    _$form.validate({
        rules: {
            UserName: {
                required: true,
                customUsername: true
            }
        }
    });
})();
