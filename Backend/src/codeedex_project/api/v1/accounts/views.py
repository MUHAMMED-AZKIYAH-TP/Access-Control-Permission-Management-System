from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model

from accounts.models import Team
from access_control.permissions import has_permission
from audit.models import AuditLog
from access_control.models import UserRole, Permission

User = get_user_model()


class TeamListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    
    def get(self, request):
        if not has_permission(request.user, "view_teams"):
            return Response({"detail": "Forbidden"}, status=403)
        teams = Team.objects.all().values("id", "name")
        return Response(teams, status=status.HTTP_200_OK)

    
    def post(self, request):
        if not has_permission(request.user, "create_team"):
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        name = request.data.get("name")

        if not name:
            return Response(
                {"detail": "Team name is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        team = Team.objects.create(name=name)

        return Response(
            {"id": team.id, "name": team.name},
            status=status.HTTP_201_CREATED
        )
        
        
    def put(self, request, team_id):
        if not has_permission(request.user, "edit_team"):
            return Response({"detail": "Forbidden"}, status=403)

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found"}, status=404)

        name = request.data.get("name")

        if name:
            team.name = name
            team.save()

        return Response(
            {"id": team.id, "name": team.name},
            status=status.HTTP_200_OK
        )
        
        
    def delete(self, request, team_id):
        if not has_permission(request.user, "delete_team"):
            return Response({"detail": "Forbidden"}, status=403)

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found"}, status=404)

        team.delete()

        return Response(
            {"detail": "Team deleted successfully"},
            status=status.HTTP_200_OK
        )












class UserListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not has_permission(request.user, "view_users"):
            return Response({"detail": "Forbidden"}, status=403)

        users = User.objects.all().values("id", "username", "email")
        return Response(users)

    def post(self, request):
        if not has_permission(request.user, "create_user"):
            return Response({"detail": "Forbidden"}, status=403)

        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Username & password required"},
                status=400
            )

        user = User.objects.create_user(
            username=username,
            password=password
        )

        AuditLog.objects.create(
            actor=request.user,
            action=f"Created user {user.username}"
        )

        return Response(
            {"id": user.id, "username": user.username},
            status=status.HTTP_201_CREATED
        )
        
    
    
    
    def put(self, request, user_id):
        if not has_permission(request.user, "edit_user"):
            return Response({"detail": "Forbidden"}, status=403)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=404)

        username = request.data.get("username")
        email = request.data.get("email")

        if username:
            user.username = username
        if email:
            user.email = email

        user.save()

        AuditLog.objects.create(
            actor=request.user,
            action=f"Edited user {user.username}"
        )

        return Response(
            {"id": user.id, "username": user.username, "email": user.email},
            status=status.HTTP_200_OK
        )
        
        
    def delete(self, request, user_id):
        if not has_permission(request.user, "delete_user"):
            return Response({"detail": "Forbidden"}, status=403)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=404)

        user.delete()

        AuditLog.objects.create(
            actor=request.user,
            action=f"Deleted user {user.username}"
        )

        return Response(
            {"detail": "User deleted successfully"},
            status=status.HTTP_200_OK
        )








class UserPermissionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        
        user_role = UserRole.objects.filter(user=user).first()
        if not user_role:
            return Response(
                {"detail": "No roles assigned to user"},
                status=status.HTTP_404_NOT_FOUND
            )

        
        permissions = Permission.objects.filter(
            roles=user_role.role
        ).values_list("code", flat=True)

        return Response(
            {
                "user_id": user.id,
                "permissions": list(permissions)
            },
            status=status.HTTP_200_OK
        )