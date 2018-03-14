from flask import request, jsonify, make_response
from flask_restful import Resource

from app import db
from app.modules.user_opportunity_favourite import UserOpportunityFave
from flask_login.utils import current_user

class UserFavesResource(Resource):
    # /api/users/favourites/
    def get(self):
        faves = [x.serialize for x in UserOpportunityFave.query.filter_by(user_id=current_user.id).all()]
        return jsonify(faves)
        
class OpportunityFavedResource(Resource):
    # /api/opportunities/favourites/<id>/
    def get(self, opp_id):
        faves = [x.serialize for x in UserOpportunityFave.query.filter_by(opportunity_id=opp_id).all()]
        return jsonify(faves)
    
    # /api/opportunities/favourites/<id>/
    def post(self, opp_id):
        if current_user.is_authenticated:
            try:
                fave = UserOpportunityFave.query.filter_by(user_id=current_user.id,
                                                          opportunity_id=opp_id).one()
                
            except:
                fave = UserOpportunityFave(user_id=current_user.id,
                                           opportunity_id=opp_id)
                                             
                current_user.fave_opportunities.append(fave)
                db.session.add(fave)
                db.session.commit()
                
            return fave.serialize, 201
        else:
            return "", 401
    
    def delete(self, opp_id):
        if current_user.is_authenticated:
            try:
                desiredOpToDelete = UserOpportunityFave.query.filter_by(user_id=current_user.id, opportunity_id=opp_id).one()
                #org.rated_users.remove(ratingToDelete)
                db.session.delete(desiredOpToDelete)
                db.session.commit()
                return "", 201
            except:
                return "noOpp", 201
        else:
            return "", 401