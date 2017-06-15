(function ($) {

    if (!$) {
        return;
    }

    $(function () {

        var $registerForm = $('#RegisterForm');

        $.validator.addMethod("customUsername", function (value, element) {
            if (value === $registerForm.find('input[name="EmailAddress"]').val()) {
                return true;
            }

            //Username can not be an email address (except the email address entered)
            return !$.validator.methods.email.apply(this, arguments);
        }, abp.localization.localize("RegisterFormUserNameInvalidMessage", "AbpProjectName"));
        
        $registerForm.validate({
            rules: {
                UserName: {
                    required: true,
                    customUsername: true
                }
            },

            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },

            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },

            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });
    });

})(jQuery);