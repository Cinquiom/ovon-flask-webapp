#import os
from app import app

# if os.environ['OVON_ENV'] == 'prod':

app.config.from_object('config.DevelopmentConfig')

app.run(host="localhost", port=app.config['PORT'])
