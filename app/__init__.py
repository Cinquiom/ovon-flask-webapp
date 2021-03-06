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
from app.modules.user_activity_post import ActivityResource
from app.modules.organization import OrganizationResource
from app.modules.organization_opportunity_post import OpportunityResource
from app.modules.organization import UserOrganizationResource
from app.modules.rating import UserToOrganizationRateResource, OrganizationToUserRateResource
# from app.modules.user_opportunity_favourite import UserFavesResource, OpportunityFavedResource
# from app.modules.organization_volunteer_favourite import OrganizationFavesResource, VolunteerFavedResource
from app.modules.favourites import UserFavesResource, OpportunityFavedResource, OrganizationFavesResource, VolunteerFavedResource
from app.modules.tag import TagResource, TagsByActivityResource, TagsByOpportunityResource, OpportunityByTagResource, ActivityByTagResource

from app.modules.auth.controllers import mod_auth as auth_module
from app.modules.util.upload import mod_uploads as uploads_module

app.register_blueprint(auth_module)
app.register_blueprint(uploads_module)
api.add_resource(UserResource,                   '/api/users/', '/api/users/<int:user_id>/')
api.add_resource(CurrentUserResource,            '/api/currentuser/')
api.add_resource(ActivityResource,               '/api/activity/', '/api/activity/<int:post_id>/')
api.add_resource(OrganizationResource,           '/api/organizations/', '/api/organizations/<int:org_id>/')
api.add_resource(OpportunityResource,            '/api/opportunities/', '/api/organizations/opportunities/', '/api/organizations/<int:org_id>/opportunities/', '/api/organizations/opportunities/<int:org_id>/')
api.add_resource(UserOrganizationResource,       '/api/currentuser/organizations/')
api.add_resource(UserToOrganizationRateResource, '/api/organizations/ratings/<int:org_id>/')
api.add_resource(OrganizationToUserRateResource, '/api/users/ratings/<int:org_id>/<int:user_id>/')
api.add_resource(UserFavesResource,              '/api/users/favourites/')
api.add_resource(OpportunityFavedResource,       '/api/opportunities/favourites/<int:opp_id>/', '/api/opportunities/<int:opp_id>/favourites/')
api.add_resource(OrganizationFavesResource,      '/api/organizations/favourites/<int:org_id>/')
api.add_resource(VolunteerFavedResource,         '/api/volunteers/favourites/<int:volunteer_id>/<int:org_id>/', '/api/volunteers/favourites/')
api.add_resource(TagResource,                    '/api/tags/', '/api/tags/<int:tag_id>/')
api.add_resource(OpportunityByTagResource,       '/api/tags/opportunities/<string:tag_name>/')
api.add_resource(ActivityByTagResource,          '/api/tags/activities/<string:tag_name>/')
api.add_resource(TagsByOpportunityResource,      '/api/opportunities/tags/<int:opp_id>/', '/api/opportunities/tags/<int:opp_id>/<int:tag_id>/')
api.add_resource(TagsByActivityResource,         '/api/activities/tags/<int:act_id>/', '/api/activities/tags/<int:act_id>/<int:tag_id>/')

@app.route('/')
def index():
    return render_template('index.html', env=app.config["ENV"])
