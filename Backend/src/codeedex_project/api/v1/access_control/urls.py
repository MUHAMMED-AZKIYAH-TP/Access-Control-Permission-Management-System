from django.urls import path
from .views import (
    RoleListCreateView,
    AssignRoleToUserView,
    AssignPermissionView,
    EditProfileView,
)

urlpatterns = [
  
    path("roles/", RoleListCreateView.as_view(), name="roles"),
    path("assign-role/",AssignRoleToUserView.as_view(),name="assign-role"),
    path( "assign-permission/", AssignPermissionView.as_view(), name="assign-permission"),
    path("edit-profile/<int:user_id>/",EditProfileView.as_view(),name="edit-profile"),
]
