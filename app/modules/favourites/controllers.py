from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_login import current_user

from app import db
from app.modules.user import User
from app.modules.organization import Organization
from app.modules.organization_opportunity_post import OpportunityPost

class UserFavesResource(Resource):
    # /api/users/favourites/
    def get(self):
        faves = [x.serialize for x in current_user.favourites]
        return jsonify(faves)
        
class OpportunityFavedResource(Resource):
    # /api/opportunities/favourites/<id>/
    def get(self, opp_id):
        if not OpportunityPost.query.get(opp_id): return "", 404
        
        faves = [x.serialize for x in OpportunityPost.query.get(opp_id).favourited_by]
        return jsonify(faves)
    
    # /api/opportunities/favourites/<id>/
    def post(self, opp_id):
        if current_user.is_authenticated:
            current_user.favourites.append(OpportunityPost.query.get(opp_id))
            db.session.commit()
            return "", 201
        else:
            return "", 401
    
    def delete(self, opp_id):
        if current_user.is_authenticated:
            current_user.favourites.remove(OpportunityPost.query.get(opp_id))
            db.session.commit()
            return "", 201
        else:
            return "", 401
        
class OrganizationFavesResource(Resource):
    # /api/organizations/favourites/
    def get(self, org_id):
        faves = [x.serialize for x in Organization.query.get(org_id).favourites]
        return jsonify(faves)
        
class VolunteerFavedResource(Resource):
    # /api/volunteers/favourites/<volunteer_id>/<org_id>/
    def get(self, volunteer_id=None, org_id=None):
        faves = [x.serialize for x in current_user.favourited_by]
        return jsonify(faves)
    
    # /api/volunteers/favourites/<volunteer_id>/<org_id>/
    def post(self, volunteer_id, org_id):
        org = Organization.query.get(org_id)
        if current_user.is_authenticated and org in current_user.organizations:
            org.favourites.append(User.query.get(volunteer_id))
            db.session.commit()
            return "", 201
        else:
            return "", 401
    
    def delete(self, org_id, volunteer_id):
        org = Organization.query.get(org_id)
        if current_user.is_authenticated and org in current_user.organizations:
            org.favourites.remove(User.query.get(volunteer_id))
            db.session.commit()
            return "", 201
        else:
            return "", 401