from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class AuditLog(models.Model):
    actor = models.ForeignKey(User,null=True,blank=True,on_delete=models.SET_NULL,related_name="audit_logs")
    action = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "audit_log_table"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.actor} - {self.action}"
