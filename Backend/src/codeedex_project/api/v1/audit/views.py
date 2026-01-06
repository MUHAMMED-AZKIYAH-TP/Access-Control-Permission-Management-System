from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from audit.models import AuditLog
from access_control.permissions import has_permission


class AuditLogListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not has_permission(request.user, "view_audit_logs"):
            return Response({"detail": "Forbidden"}, status=403)

        logs = AuditLog.objects.all().values(
            "id", "actor__username", "action", "created_at"
        )

        return Response(logs)
