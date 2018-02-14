from flask import jsonify, request
from flask_restful import Resource
from flask_login import current_user

from app.modules.organization import Organization
from app import db

class OrganizationResource(Resource):
    def get(self, org_id=None):
        if org_id:
            response = Organization.query.get(org_id).serialize
        else:
            response = [x.serialize for x in Organization.query.all()]
           
        return jsonify(response)

    def post(self):
        if current_user.is_authenticated:
            o = Organization(**request.json)
            current_user.organizations.append(o)
        
            db.session.add(o)
            db.session.commit()
        
            return o.serialize, 201
        else:
            return "", 403
    