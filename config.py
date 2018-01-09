import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__)) 

# Flask config

DEBUG = True

# Web security

CSRF_ENABLED = True
CSRF_SESSION_KEY = "a super secret"
SECRET_KEY = "a super secret"

# SQLAlchemy config

#SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app.db')
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://dbuser:dickbutt@localhost:3306/ovon'
DATABASE_CONNECT_OPTIONS = {}
SQLALCHEMY_TRACK_MODIFICATIONS = True

# Performance

THREADS_PER_PAGE = 2

