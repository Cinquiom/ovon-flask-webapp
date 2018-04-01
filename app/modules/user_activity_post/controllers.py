"""
    Encapsulates a REST endpoint for the activity feed posts.
"""

from flask import Blueprint, request, jsonify, make_response
from flask_login import current_user
from flask_restful import Resource

from app import db
from app.modules.user import User
from app.modules.user_activity_post.models import ActivityPost
from app.modules.rating import OrganizationToUserRate

class ActivityResource(Resource):

    """
        If a post ID is supplied, returns a single post.
        Otherwise, gets all posts.
    """
    def get(self, post_id=None):
        if post_id:
            posts = ActivityPost.query.get(post_id)
            return jsonify(posts.serialize)
        else:
            posts = ActivityPost.query.all()            
            return jsonify(list(reversed([x.serialize for x in posts])))

    """
        Creates a new post.
    """
    def post(self):
        if current_user.is_authenticated:
            content = request.json
            
            ap = ActivityPost(**content)
                                         
            current_user.activity_posts.append(ap)
            
            db.session.add(ap)
            db.session.commit()
            
            return make_response(jsonify(ap.serialize), 201)
        else:
            return "", 401
        
    def delete(self, post_id):
        ap = ActivityPost.query.get(post_id)
        if current_user.is_authenticated and ap in current_user.activity_posts:
            db.session.delete(ap)
            db.session.commit()
            
            return "", 200
        else:
            return "", 401