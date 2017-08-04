(function() {
    $(function() {

        var _userService = abp.services.app.user;
        var _$modal = $('#UserCreateModal');
        var _$form = _$modal.find('form');

        _$form.validate({
            rules: {
                Password: "required",
                ConfirmPassword: {
                    equalTo: "#Password"
                }
            }
        });

        $('#RefreshButton').click(function () {
            refreshUserList();
        });

        $('.delete-user').click(function () {
            var userId = $(this).attr("data-user-id");
            var userName = $(this).attr('data-user-name');

            deleteUser(userId, userName);
        });

        $('.edit-user').click(function (e) {
            var userId = $(this).attr("data-user-id");

            e.preventDefault();
            $.ajax({
                url: abp.appPath + 'Users/EditUserModal?userId=' + userId,
                type: 'POST',
                contentType: 'application/html',
                success: function (content) {
                    $('#UserEditModal div.modal-content').html(content);
                },
                error: function (e) { }
            });
        });

        _$form.find('button[type="submit"]').click(function (e) {
            e.preventDefault();

            if (!_$form.valid()) {
                return;
            }

            var user = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js
            user.roleNames = [];
            var _$roleCheckboxes = $("input[name='role']:checked");
            if (_$roleCheckboxes) {
                for (var roleIndex = 0; roleIndex < _$roleCheckboxes.length; roleIndex++) {
                    var _$roleCheckbox = $(_$roleCheckboxes[roleIndex]);
                    user.roleNames.push(_$roleCheckbox.val());
                }
            }

            abp.ui.setBusy(_$modal);
            _userService.create(user).done(function () {
                _$modal.modal('hide');
                location.reload(true); //reload page to see new user!
            }).always(function () {
                abp.ui.clearBusy(_$modal);
            });
        });
        
        _$modal.on('shown.bs.modal', function () {
            _$modal.find('input:not([type=hidden]):first').focus();
        });

        function refreshUserList() {
            location.reload(true); //reload page to see new user!
        }

        function deleteUser(userId, userName) {
            abp.message.confirm(
                "Delete user '" + userName + "'?",
                function (isConfirmed) {
                    if (isConfirmed) {
                        _userService.delete({
                            id: userId
                        }).done(function () {
                            refreshUserList();
                        });
                    }
                }
            );
        }
    });
})();