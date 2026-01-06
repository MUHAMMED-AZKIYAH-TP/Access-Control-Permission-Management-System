
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions

from django.contrib.auth import get_user_model
from accounts.models import Team
from access_control.permissions import has_permission
from .serializers import RegisterSerializer

User = get_user_model()


class UserListCreateView(APIView):
    """
    Admin: list users, create users
    """

    def get(self, request):
        if not has_permission(request.user, "view_users"):
            return Response({"detail": "Permission denied"}, status=403)

        users = User.objects.all()
        data = [
            {
                "id": u.id,
                "username": u.username,
                "email": u.email,
                "team": u.team.name if u.team else None
            }
            for u in users
        ]
        return Response(data)

    def post(self, request):
        if not has_permission(request.user, "create_user"):
            return Response({"detail": "Permission denied"}, status=403)

        user = User.objects.create_user(
            username=request.data["username"],
            email=request.data["email"],
            password=request.data["password"]
        )
        return Response({"id": user.id}, status=201)


class AssignTeamView(APIView):
    """
    Admin: assign user to team
    """

    def post(self, request, user_id):
        if not has_permission(request.user, "assign_team"):
            return Response({"detail": "Permission denied"}, status=403)

        team = Team.objects.get(id=request.data["team_id"])
        user = User.objects.get(id=user_id)
        user.team = team
        user.save()

        return Response({"success": True})
    
    




class RegisterView(APIView):
    """
    Public API – User Registration
    """

    permission_classes = []  # AllowAny

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception:
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST
            )


