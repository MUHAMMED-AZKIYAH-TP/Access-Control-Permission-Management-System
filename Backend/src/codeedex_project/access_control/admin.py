from django.contrib import admin
from .models import (
    Permission,
    Role,
    UserRole,
    PermissionAssignment,
)


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "description")
    search_fields = ("code",)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    filter_horizontal = ("permissions",)  # many-to-many UI


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ("id","user","role","start_at","end_at","is_active_display",)
    list_filter = ("role",)
    search_fields = ("user__username", "role__name")

    def is_active_display(self, obj):
        return obj.is_active()

    is_active_display.boolean = True
    is_active_display.short_description = "Active"


@admin.register(PermissionAssignment)
class PermissionAssignmentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "permission", "scope")
    list_filter = ("scope",)
    search_fields = ("user__username", "permission__code")
