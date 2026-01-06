from django.contrib.auth.models import AbstractUser
from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        db_table = "Team_table"
        verbose_name = "Team"
        verbose_name_plural = "Teams"
        ordering = ["-id"]

    def __str__(self):
        return self.name


class User(AbstractUser):
    team = models.ForeignKey(Team,null=True,blank=True,on_delete=models.SET_NULL,related_name="users")
    email = models.EmailField(max_length=255, unique=True, error_messages={'unique': "Email already used"})

    class Meta:
        db_table = "User_table"
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-id"]
        
    def __str__(self):
        return self.username