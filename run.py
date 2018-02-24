#import os
from app import app, db

# if os.environ['OVON_ENV'] == 'prod':
app.config.from_object('config.DevelopmentConfig')
db.create_all()


app.run(host="localhost", port=app.config['PORT'])
