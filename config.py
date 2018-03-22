# Generic config options for this application

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__)) 

class Config(object):
    
    # Flask config
    
    DEBUG = False
    TESTING = False
    PORT = 8090

    # Web security
    
    CSRF_ENABLED = True
    CSRF_SESSION_KEY = "a super secret"
    SECRET_KEY = "a super secret"
    
    # SQLAlchemy config
    
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    DATABASE_CONNECT_OPTIONS = {}
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    
    # Performance
    
    THREADS_PER_PAGE = 2
    
    # Uploads
    
    UPLOADS_DEFAULT_DEST = os.path.join(BASE_DIR, 'uploads')

class ProductionConfig(Config):
    ENV = "prod"
    HOST = "ovon.club"
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://dbuser:dickbutt@localhost:3306/ovon'

class DevelopmentConfig(Config):
    ENV = "dev"
    HOST = "localhost"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app.db')

class TestingConfig(DevelopmentConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    


