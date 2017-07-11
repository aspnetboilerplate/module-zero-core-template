(function () {
	$(function () {

		var _roleService = abp.services.app.role;
		var _$modal = $('#RoleCreateModal');
		var _$form = _$modal.find('form');

		_$form.validate({
		});

		$('#RefreshButton').click(function () {
			refreshRoleList();
		});

		$('.delete-role').click(function () {
			var roleId = $(this).attr("data-role-id");
			var roleName = $(this).attr('data-role-name');

			deleteRole(roleId, roleName);
		});

		$('.edit-role').click(function (e) {
			var roleId = $(this).attr("data-role-id");

			e.preventDefault();
			$.ajax({
				url: abp.appPath + 'Roles/EditRoleModal?roleId=' + roleId,
				type: 'POST',
				contentType: 'application/html',
				success: function (content) {
					$('#RoleEditModal div.modal-content').html(content);
				},
				error: function (e) { }
			});
		});

		_$form.find('button[type="submit"]').click(function (e) {
			e.preventDefault();

			if (!_$form.valid()) {
				return;
			}

			var role = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js
			role.permissions = [];
			var _$permissionCheckboxes = $("input[name='permission']:checked");
			if (_$permissionCheckboxes) {
				for (var permissionIndex = 0; permissionIndex < _$permissionCheckboxes.length; permissionIndex++) {
					var _$permissionCheckbox = $(_$permissionCheckboxes[permissionIndex]);
					role.permissions.push(_$permissionCheckbox.val());
				}
			}

			abp.ui.setBusy(_$modal);
			_roleService.create(role).done(function () {
				_$modal.modal('hide');
				location.reload(true); //reload page to see new role!
			}).always(function () {
				abp.ui.clearBusy(_$modal);
			});
		});

		_$modal.on('shown.bs.modal', function () {
			_$modal.find('input:not([type=hidden]):first').focus();
		});

		function refreshRoleList() {
			location.reload(true); //reload page to see new role!
		}

		function deleteRole(roleId, roleName) {
			abp.message.confirm(
				"Remove Users from Role and delete Role '" + roleName + "'?",
				function (isConfirmed) {
					if (isConfirmed) {
						_roleService.delete({
							id: roleId
						}).done(function () {
							refreshRoleList();
						});
					}
				}
			);
		}
	});
})();