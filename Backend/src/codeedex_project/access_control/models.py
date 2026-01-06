from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL


class Permission(models.Model):
    code = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    class Meta:
        db_table = "permission_table"
        ordering = ["code"]

    def __str__(self):
        return self.code


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    permissions = models.ManyToManyField(Permission,related_name="roles")

    class Meta:
        db_table = "role_table"
        ordering = ["name"]

    def __str__(self):
        return self.name


class UserRole(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_roles")
    role = models.ForeignKey(Role,on_delete=models.CASCADE,related_name="user_roles")
    start_at = models.DateTimeField(null=True, blank=True)
    end_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "user_role_table"
        unique_together = ("user", "role")

    def is_active(self):
        now = timezone.now()
        if self.start_at and now < self.start_at:
            return False
        if self.end_at and now > self.end_at:
            return False
        return True

    def __str__(self):
        return f"{self.user} → {self.role}"


class PermissionAssignment(models.Model):
    SCOPE_CHOICES = (
        ("self", "Self"),
        ("team", "Team"),
        ("global", "Global"),
    )

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="direct_permissions")
    permission = models.ForeignKey(Permission,on_delete=models.CASCADE,related_name="user_assignments")
    scope = models.CharField(max_length=10, choices=SCOPE_CHOICES)

    class Meta:
        db_table = "permission_assignment_table"
        unique_together = ("user", "permission", "scope")

    def __str__(self):
        return f"{self.user} → {self.permission} ({self.scope})"
