from flask import request, jsonify, make_response
from flask_restful import Resource

from app import db
from app.modules.organization import Organization
from app.modules.rating import UserToOrganizationRate, OrganizationToUserRate
from flask_login.utils import current_user

class UserToOrganizationRateResource(Resource):
    def get(self, org_id):
        ratings = [x.serialize for x in UserToOrganizationRate.query.filter_by(organization_id=org_id).all()]
        return jsonify(ratings)
    
    def post(self, org_id):
        content = request.json
        if current_user.is_authenticated:
             
            try:
                utor = UserToOrganizationRate.query.filter_by(user_id=current_user.id,
                                                              organization_id=org_id).one()
                
                utor.rating = content['rating']
                
            except:
                utor = UserToOrganizationRate(user_id=current_user.id,
                                              organization_id=org_id,
                                              rating=content['rating'])
                                             
                current_user.rated_organizations.append(utor)
                db.session.add(utor)
                
            db.session.commit()
            return utor.serialize, 201
        else:
            return "", 401
        
    def delete(self, org_id):
        if current_user.is_authenticated:
            try:
                ratingToDelete = UserToOrganizationRate.query.filter_by(user_id=current_user.id, organization_id=org_id).one()
                #org.rated_users.remove(ratingToDelete)
                db.session.delete(ratingToDelete)
                db.session.commit()
                return "", 201
            except:
                return "noRating", 201
        else:
            return "", 401
            
class OrganizationToUserRateResource(Resource):
    def get(self, user_id, org_id=None):
        ratings = [x.serialize for x in OrganizationToUserRate.query.filter_by(user_id=user_id).all()]
        return jsonify(ratings)
    
    def put(self, org_id, user_id):
        content = request.json
        org = Organization.query.get(org_id)
        if org and org in current_user.organizations:
            try:
                otur = OrganizationToUserRate.query.filter_by(user_id=user_id,
                                                              organization_id=org_id).one()
                otur.rating = content['rating']
            except:    
                otur = OrganizationToUserRate(user_id=user_id,
                                              organization_id=org_id,
                                              rating=content['rating'])
              
                org.rated_users.append(otur)
                db.session.add(otur)
                
            db.session.commit()
            
            return otur.serialize, 201
        else:
            return "", 401
        
    def delete(self, org_id, user_id):
        org = Organization.query.get(org_id)
        if org and org in current_user.organizations:
            try:
                ratingToDelete = OrganizationToUserRate.query.filter_by(user_id=user_id, organization_id=org_id).one()
                #org.rated_users.remove(ratingToDelete)
                db.session.delete(ratingToDelete)
                db.session.commit()
                return "", 201
            except:
                return "noRating", 201
        else:
            return "", 401
            
            