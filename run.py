import os
from app import app

if os.environ['OVON_ENV'] == 'prod':
    app.config.from_object('config.ProductionConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

app.run(port=app.config['PORT'])
