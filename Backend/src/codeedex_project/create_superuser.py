import os
from django.contrib.auth import get_user_model

def run():
    if os.getenv("SUPERUSER_CREATE") != "true":
        print("SUPERUSER_CREATE not enabled.")
        return

    username = os.getenv("SUPERUSER_USERNAME")
    password = os.getenv("SUPERUSER_PASSWORD")

    if not username or not password:
        print("Missing SUPERUSER_USERNAME or SUPERUSER_PASSWORD.")
        return

    User = get_user_model()

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            password=password
        )
        print(f"✅ Superuser created: {username}")
    else:
        print(f"ℹ️ Superuser already exists: {username}")
