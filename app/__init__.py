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

from app.modules.user import UserResource, CurrentUserResource
from app.modules.organization import OrganizationResource
from app.modules.auth.controllers import mod_auth as auth_module
from app.modules.user_activity_post.controllers import ActivityModule as activityfeed_module

app.register_blueprint(auth_module)
api.add_resource(activityfeed_module,   '/api/activity/', '/api/activity/<int:post_id>')
api.add_resource(UserResource,          '/api/users/', '/api/users/<int:user_id>')
api.add_resource(CurrentUserResource,   '/api/currentuser')
api.add_resource(OrganizationResource,  '/api/organizations/', '/api/organizations/<int:org_id>')

@app.route('/')
def index():
    return render_template('index.html', env="dev")
