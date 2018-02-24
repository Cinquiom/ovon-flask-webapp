"""
    Encapsulates a REST endpoint for the opportunity posts.
"""

from flask import request, jsonify
from flask_login import current_user
from flask_restful import Resource

from app import db
from app.modules.organization_opportunity_post import OpportunityPost
from app.modules.organization import Organization

class OpportunityResource(Resource):

    """
        If an opportunity ID is supplied, returns a single post.
        Otherwise, gets all opportunity posts.
        @TODO: add query parameter filtering
    """
    def get(self, org_id=None):
        if org_id:
            posts = [x.serialize for x in OpportunityPost.query.all() if x.organization_id == int(org_id)]
        else:
            posts = [x.serialize for x in OpportunityPost.query.all()]
        

        return jsonify(posts)


    """
        Creates a new opportunity post.
        @TODO: Error checking and handling
    """
    def post(self, org_id):
        org = Organization.query.get(org_id)
        
        if org and org in current_user.organizations:
            content = request.json
            
            op = OpportunityPost(**content)
            org.opportunities.append(op)
            
            db.session.add(op)
            db.session.commit()
            
            return op.serialize, 201
        else:
            return "", 401
        