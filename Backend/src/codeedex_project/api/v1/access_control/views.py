from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from access_control.models import Permission, Role,UserRole
from access_control.permissions import has_permission
from audit.models import AuditLog

from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_datetime
from accounts.models import Team




User = get_user_model()



class PermissionCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not has_permission(request.user, "create_permission"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        code = request.data.get("code")
        description = request.data.get("description", "")

        if not code:
            return Response(
                {"detail": "Permission code is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        perm, created = Permission.objects.get_or_create(
            code=code,
            defaults={"description": description}
        )

        if not created:
            return Response(
                {"detail": "Permission already exists"},
                status=status.HTTP_409_CONFLICT
            )

        AuditLog.objects.create(
            actor=request.user,
            action=f"Created permission {perm.code}"
        )

        return Response(
            {"id": perm.id, "code": perm.code},
            status=status.HTTP_201_CREATED
        )


class PermissionListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not has_permission(request.user, "view_roles"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        permissions_qs = Permission.objects.all().values(
            "id", "code", "description"
        )

        return Response(permissions_qs, status=status.HTTP_200_OK)
    
    
    
    def delete(self, request, permission_id):
        if not has_permission(request.user, "delete_permission"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            permission = Permission.objects.get(id=permission_id)
        except Permission.DoesNotExist:
            return Response(
                {"detail": "Permission not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        permission.delete()

        AuditLog.objects.create(
            actor=request.user,
            action=f"Deleted permission {permission.code}"
        )

        return Response(
            {"message": "Permission deleted successfully"},
            status=status.HTTP_200_OK
        )



class RoleListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not has_permission(request.user, "view_roles"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        roles = Role.objects.all().values("id", "name")
        return Response(roles, status=status.HTTP_200_OK)

    def post(self, request):
        if not has_permission(request.user, "create_role"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        name = request.data.get("name")

        if not name:
            return Response(
                {"detail": "Role name is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        role, created = Role.objects.get_or_create(name=name)

        if not created:
            return Response(
                {"detail": "Role already exists"},
                status=status.HTTP_409_CONFLICT
            )

        AuditLog.objects.create(
            actor=request.user,
            action=f"Created role {role.name}"
        )

        return Response(
            {"id": role.id, "name": role.name},
            status=status.HTTP_201_CREATED
        )
        
        
        
    def put(self, request, role_id):
        if not has_permission(request.user, "edit_role"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response(
                {"detail": "Role not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        role.name = request.data.get("name")
        role.save()

        AuditLog.objects.create(
            actor=request.user,
            action=f"Updated role {role.name}"
        )

        return Response(
            {"message": "Role updated successfully"},
            status=status.HTTP_200_OK
        )
        
        
    def delete(self, request, role_id):
        if not has_permission(request.user, "delete_role"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response(
                {"detail": "Role not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        role.delete()

        AuditLog.objects.create(
            actor=request.user,
            action=f"Deleted role {role.name}"
        )

        return Response(
            {"message": "Role deleted successfully"},
            status=status.HTTP_200_OK
        )
        
        
        



class RolePermissionsView(APIView):
    """
    GET  -> List permission IDs assigned to role
    POST -> Assign permissions to role
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, role_id):
        if not has_permission(request.user, "view_roles"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response(
                {"detail": "Role not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        permission_ids = list(
            role.permissions.values_list("id", flat=True)
        )

        return Response(permission_ids, status=status.HTTP_200_OK)

    def post(self, request, role_id):
        if not has_permission(request.user, "assign_role"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        permission_ids = request.data.get("permission_ids", [])

        if not isinstance(permission_ids, list):
            return Response(
                {"detail": "permission_ids must be a list"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response(
                {"detail": "Role not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        permissions_qs = Permission.objects.filter(id__in=permission_ids)
        role.permissions.set(permissions_qs)

        AuditLog.objects.create(
            actor=request.user,
            action=f"Updated permissions for role {role.name}"
        )

        return Response(
            {"message": "Permissions assigned successfully"},
            status=status.HTTP_200_OK
        )
        
        
        
        
        
        
        
        
        

class AssignRoleToUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        if not has_permission(request.user, "assign_role"):
            return Response({"detail": "Forbidden"}, status=403)

        role_id = request.data.get("role_id")
        start_at = request.data.get("start_at")
        end_at = request.data.get("end_at")

        if not role_id:
            return Response({"detail": "role_id is required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
            role = Role.objects.get(id=role_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=404)
        except Role.DoesNotExist:
            return Response({"detail": "Role not found"}, status=404)

        user_role, created = UserRole.objects.get_or_create(
            user=user,
            role=role,
            defaults={
                "start_at": parse_datetime(start_at) if start_at else None,
                "end_at": parse_datetime(end_at) if end_at else None,
            }
        )

        if not created:
            return Response(
                {"detail": "This role is already assigned to the user"},
                status=409
            )

        AuditLog.objects.create(
            actor=request.user,
            action=f"Assigned role {role.name} to {user.username}"
        )

        return Response(
            {"message": "Role assigned successfully"},
            status=201
        )
        
    
class AssignTeamView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        # 🔐 Permission check
        if not has_permission(request.user, "assign_team"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        team_id = request.data.get("team_id")

        if not team_id:
            return Response(
                {"detail": "team_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ Get user safely
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # ✅ Get team safely
        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response(
                {"detail": "Team not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # ✅ Assign team
        user.team = team
        user.save()

        # 🧾 Audit log
        AuditLog.objects.create(
            actor=request.user,
            action=f"Assigned team {team.name} to {user.username}"
        )

        return Response(
            {"message": "Team assigned successfully"},
            status=status.HTTP_200_OK
        )
