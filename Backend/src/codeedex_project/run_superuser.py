import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "codeedex_project.settings")
django.setup()

from create_superuser import run

if __name__ == "__main__":
    run()
