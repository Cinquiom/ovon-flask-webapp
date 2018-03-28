import sys
sys.path.insert(0, '/var/www/ovon-flask-webapp/')
from app import app
app.config.from_object('config.ProductionConfig')

application = app
