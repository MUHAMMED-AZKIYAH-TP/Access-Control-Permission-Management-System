from django.urls import path
from .views import (
    PermissionCreateView,
    PermissionListView,
    RoleListCreateView,
    RolePermissionsView,
    AssignRoleToUserView,
    AssignTeamView,
)

urlpatterns = [
    # Permissions
    path(
        "permissions/",
        PermissionCreateView.as_view(),
        name="permissions-create"
    ),
    path(
        "permissions/list/",
        PermissionListView.as_view(),
        name="permissions-list"
    ),

    # Roles
    path(
        "roles/",
        RoleListCreateView.as_view(),
        name="roles-list-create"
    ),

    # Role ↔ Permissions (GET + POST)
    path(
        "roles/<int:role_id>/permissions/",
        RolePermissionsView.as_view(),
        name="role-permissions"
    ),
    path(
    "users/<int:user_id>/roles/",
    AssignRoleToUserView.as_view(),
),
    path(
    "users/<int:user_id>/team/",
    AssignTeamView.as_view(),
),
    
    
    path(
        "permissions/list/<int:permission_id>/",
        PermissionListView.as_view(),
        name="permissions-list"
    ),
    
    path(
        "roles/<int:role_id>/",
        RoleListCreateView.as_view(),
        name="roles-list-create"
    ),
]
