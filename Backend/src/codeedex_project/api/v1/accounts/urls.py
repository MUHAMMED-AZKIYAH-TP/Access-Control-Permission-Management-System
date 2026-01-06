from django.urls import path
from .views import UserListCreateView, AssignTeamView,RegisterView,LogoutView


urlpatterns = [
   
    path("users/", UserListCreateView.as_view(), name="users"),
    path("users/<int:user_id>/assign-team/",AssignTeamView.as_view(),name="assign-team"),
    path("register/", RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
