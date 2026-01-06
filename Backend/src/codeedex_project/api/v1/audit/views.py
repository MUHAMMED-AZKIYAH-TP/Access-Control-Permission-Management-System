
from rest_framework.views import APIView
from rest_framework.response import Response
from access_control.permissions import has_permission
from audit.models import AuditLog


class AuditLogListView(APIView):
    """
    Admin: view audit logs
    """

    def get(self, request):
        if not has_permission(request.user, "view_audit_logs"):
            return Response({"detail": "Permission denied"}, status=403)

        logs = AuditLog.objects.all().order_by("-created_at")
        return Response([
            {
                "id": log.id,
                "actor": log.actor.username if log.actor else None,
                "action": log.action,
                "created_at": log.created_at,
            }
            for log in logs
        ])
