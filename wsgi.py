# WSGI entry point for PythonAnywhere
import sys
import os

# Add project directory to path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

from server import app

# This is required by PythonAnywhere
application = app
