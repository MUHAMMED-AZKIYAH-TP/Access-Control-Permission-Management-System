from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path,include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),

    path("api/v1/accounts/", include("api.v1.accounts.urls")),
    path("api/v1/access/", include("api.v1.access_control.urls")),
    path("api/v1/audit/", include("api.v1.audit.urls")),
]

if settings.DEBUG:
    urlpatterns += (
        static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) +
        static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
    )
