from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_restful import Api

app = Flask(__name__)
app.config.from_object('config.Config')
login_manager = LoginManager()
login_manager.init_app(app)
api = Api(app)

# Must go before controller imports
db = SQLAlchemy(app)

from app.mod_auth.controllers import mod_auth as auth_module
from app.mod_activityfeed.controllers import ActivityModule as activityfeed_module

app.register_blueprint(auth_module)
api.add_resource(activityfeed_module, '/api/activity/', '/api/activity/<int:post_id>')

# @app.errorhandler(404)
# def not_found(error):
#     return render_template('404.html'), 404

@app.route('/')
def index():
    return render_template('index.html')
