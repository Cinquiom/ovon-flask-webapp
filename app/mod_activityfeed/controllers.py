"""
    Encapsulates a REST endpoint for the activity feed posts.
"""

from flask import Blueprint, request, jsonify
from flask_login import current_user
from flask_restful import Resource

from app import db
from app.mod_auth.models import User
from app.mod_activityfeed.models import ActivityPost


class ActivityModule(Resource):

    """
        If a post ID is supplied, returns a single post.
        Otherwise, gets all posts.
        @TODO: add query parameter filtering
    """
    def get(self, post_id=None):
        if post_id:
            posts = ActivityPost.query.get(post_id)
            return jsonify(posts.serialize)
        else:
            posts = ActivityPost.query.all()
            return jsonify([x.serialize for x in posts])

    """
        Creates a new post.
        @TODO: Error checking and handling
    """
    def post(self):
        if current_user.is_authenticated:
            content = request.json
            
            ap = ActivityPost(**content)
            current_user.activity_posts.append(ap)
            
            db.session.add(ap)
            db.session.commit()
            
            return jsonify(ap.serialize), 201
        else:
            return "", 401
        