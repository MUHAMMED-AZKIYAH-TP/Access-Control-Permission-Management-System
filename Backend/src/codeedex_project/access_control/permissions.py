def has_permission(user, permission_code, target_user=None):
    if not user.is_authenticated:
        return False

    # Role-based permissions
    role_permissions = set()
    for ur in user.userrole_set.all():
        if ur.is_active():
            role_permissions.update(
                ur.role.permissions.values_list("code", flat=True)
            )

    if permission_code in role_permissions:
        return True

    # Direct permissions
    for pa in user.permissionassignment_set.all():
        if pa.permission.code != permission_code:
            continue

        if pa.scope == "global":
            return True

        if pa.scope == "self" and target_user == user:
            return True

        if pa.scope == "team" and target_user.team == user.team:
            return True

    return False
