from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Team

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id","username","email","team","is_staff","is_active","date_joined",)
    search_fields = ("username", "email")
    list_filter = ("is_staff", "is_active", "team")
    ordering = ("-date_joined",)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
