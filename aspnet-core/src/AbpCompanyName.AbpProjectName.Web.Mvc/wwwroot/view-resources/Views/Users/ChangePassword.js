(function ($) {
    var _userService = abp.services.app.user,
        l = abp.localization.getSource('AbpProjectName'),
        _$form = $('#ChangePassword');

    $.validator.addMethod("regex", function (value, element, regexpr) {
        return regexpr.test(value);
    }, l("PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber"));

    _$form.validate({
        rules: {
            NewPassword: {
                regex: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/
            },
            ConfirmNewPassword: {
                equalTo: "#NewPassword"
            }
        },
        messages: {
            ConfirmNewPassword: {
                equalTo: l("PasswordsDoNotMatch")
            }
        }
    });

    function save() {
        if (!_$form.valid()) {
            return;
        }

        var changePasswordDto = _$form.serializeFormToObject();

        abp.ui.setBusy(_$form);
        var skipClearBusy = false;
        _userService.changePassword(changePasswordDto).done(success => {
            if (success) {
                skipClearBusy = true;
                abp.notify.info(l('SavedSuccessfully'));
                setTimeout(() => {
                    window.location.href = "/";
                }, 1200);
            }
        }).always(function () {
            if (!skipClearBusy) {
                abp.ui.clearBusy(_$form);
            }
        });
    }

    _$form.find(".save-button").click(function (e) {
        e.preventDefault();
        save();
    });

    _$form.find('input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            save();
        }
    });
})(jQuery);