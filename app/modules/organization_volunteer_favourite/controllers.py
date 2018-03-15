from flask import request, jsonify, make_response
from flask_restful import Resource

from app import db
from app.modules.user_opportunity_favourite import UserOpportunityFave
from flask_login.utils import current_user

class OrganizationFavesResource(Resource):
    # /api/organizations/favourites/
    def get(self, org_id):
        faves = [x.serialize for x in OrganizationVolunteerFave.query.filter_by(org_id=org_id).all()]
        return jsonify(faves)
        
class VolunteerFavedResource(Resource):
    # /api/volunteers/favourites/<org_id>/<volunteer_id>/
    def get(self, volunteer_id, org_id=None):
        faves = [x.serialize for x in OrganizationVolunteerFave.query.filter_by(volunteer_id=volunteer_id).all()]
        return jsonify(faves)
    
    # /api/volunteers/favourites/<org_id>/<volunteer_id>/
    def post(self, org_id, volunteer_id):
        if current_user.is_authenticated:
            try:
                fave = OrganizationVolunteerFave.query.filter_by(org_id=org_id,
                                                          volunteer_id=volunteer_id).one()
                
            except:
                fave = OrganizationVolunteerFave(org_id=org_id,
                                           volunteer_id=volunteer_id)
                                             
                current_user.orgs_faved.append(fave)
                db.session.add(fave)
                db.session.commit()
                
            return fave.serialize, 201
        else:
            return "", 401
    
    def delete(self, org_id, volunteer_id):
        if current_user.is_authenticated:
            try:
                desiredVolunteerToDelete = OrganizationVolunteerFave.query.filter_by(org_id=org_id, volunteer_id=volunteer_id).one()
                #org.rated_users.remove(ratingToDelete)
                db.session.delete(desiredVolunteerToDelete)
                db.session.commit()
                return "", 201
            except:
                return "noVolunteer", 201
        else:
            return "", 401