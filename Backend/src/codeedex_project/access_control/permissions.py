from django.utils import timezone


def has_permission(user, permission_code, target_user=None):
    if not user or not user.is_authenticated:
        return False

    now = timezone.now()

    # -------------------------
    # ROLE-BASED PERMISSIONS
    # -------------------------
    for ur in user.user_roles.all():   # ✅ FIXED
        if not ur.is_active():
            continue

        if ur.role.permissions.filter(code=permission_code).exists():
            return True

    # -------------------------
    # DIRECT PERMISSIONS
    # -------------------------
    for pa in user.direct_permissions.all():  # ✅ FIXED
        if pa.permission.code != permission_code:
            continue

        if pa.scope == "global":
            return True

        if pa.scope == "self" and target_user == user:
            return True

        if pa.scope == "team" and target_user and target_user.team == user.team:
            return True

    return False
