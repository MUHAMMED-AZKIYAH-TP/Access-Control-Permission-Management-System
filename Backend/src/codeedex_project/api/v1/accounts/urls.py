from django.urls import path
from .views import TeamListCreateView, UserListCreateView, UserPermissionView

urlpatterns = [
    path("teams/", TeamListCreateView.as_view(), name="teams"),
    path("users/", UserListCreateView.as_view(), name="users"),
    path("teams/<int:team_id>/", TeamListCreateView.as_view()),
    path("users/<int:user_id>/", UserListCreateView.as_view(), name="users"),
    path("permissions_list/", UserPermissionView.as_view(), name="user-permissions"),
]
