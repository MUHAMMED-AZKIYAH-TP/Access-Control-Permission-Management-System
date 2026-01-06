from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from access_control.models import Role, UserRole, PermissionAssignment
from access_control.permissions import has_permission
from audit.models import AuditLog

User = get_user_model()


class RoleListCreateView(APIView):
    """
    Admin: create & view roles
    """

    def get(self, request):
        if not has_permission(request.user, "view_roles"):
            return Response({"detail": "Permission denied"}, status=403)

        roles = Role.objects.all()
        return Response([
            {"id": r.id, "name": r.name} for r in roles
        ])

    def post(self, request):
        if not has_permission(request.user, "create_role"):
            return Response({"detail": "Permission denied"}, status=403)

        role = Role.objects.create(name=request.data["name"])
        AuditLog.objects.create(
            actor=request.user,
            action=f"Created role {role.name}"
        )
        return Response({"id": role.id}, status=201)


class AssignRoleToUserView(APIView):
    """
    Admin: assign role to user (time-based)
    """

    def post(self, request):
        if not has_permission(request.user, "assign_role"):
            return Response({"detail": "Permission denied"}, status=403)

        UserRole.objects.create(
            user_id=request.data["user_id"],
            role_id=request.data["role_id"],
            start_at=request.data.get("start_at"),
            end_at=request.data.get("end_at"),
        )

        AuditLog.objects.create(
            actor=request.user,
            action="Assigned role to user"
        )

        return Response({"success": True})


class AssignPermissionView(APIView):
    """
    Admin: assign permission directly to user with scope
    """

    def post(self, request):
        if not has_permission(request.user, "assign_permission"):
            return Response({"detail": "Permission denied"}, status=403)

        PermissionAssignment.objects.create(
            user_id=request.data["user_id"],
            permission_id=request.data["permission_id"],
            scope=request.data["scope"]
        )

        AuditLog.objects.create(
            actor=request.user,
            action="Assigned permission to user"
        )

        return Response({"success": True})


class EditProfileView(APIView):
    """
    User: edit profile based on scope
    """

    def put(self, request, user_id):
        target_user = User.objects.get(id=user_id)

        if not has_permission(
            request.user,
            "edit_profile",
            target_user=target_user
        ):
            return Response(
                {"detail": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        target_user.first_name = request.data.get("first_name")
        target_user.last_name = request.data.get("last_name")
        target_user.save()

        return Response({"success": True})
