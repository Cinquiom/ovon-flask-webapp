#import os
from app import app, db

# if os.environ['OVON_ENV'] == 'prod':

db.create_all()
app.config.from_object('config.DevelopmentConfig')

app.run(host="localhost", port=app.config['PORT'])
