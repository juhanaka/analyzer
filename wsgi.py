"""
WSGI config for analyzer project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

import os
import sys
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "analyzer.settings")

path = '/home/ubuntu'
path2 = 'home/ubuntu/analyzer'
if path not in sys.path:
    sys.path.append(path)
    sys.path.append(path2)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

