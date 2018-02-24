from flask import jsonify, request
from flask_login import current_user
from flask_restful import Resource

from app.modules.user import User
from app import db

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            response = User.query.get(user_id).serialize
        else:
            response = [x.serialize for x in User.query.all()]
           
        return jsonify(response)

    def post(self):
        u = User(**request.json)
        
        db.session.add(u)
        db.session.commit()
        
        return u.serialize, 201
    
class CurrentUserResource(Resource):
    def get(self):
        if current_user.is_authenticated:
            return jsonify(current_user.serialize)
        else:
            return "", 401