from flask import request, jsonify
from flask_login import current_user
from flask_restful import Resource

from app import db
from app.modules.tag import Tag
from app.modules.organization_opportunity_post import OpportunityPost
from app.modules.user_activity_post.models import ActivityPost

# /api/tags/<tag_id>
class TagResource(Resource):

    def get(self, tag_id=None):
        if tag_id:
            tags = [x.serialize for x in Tag.query.get(tag_id)]
        else:
            tags = [x.serialize for x in Tag.query.all()]
            
        return jsonify(tags)
    
# /api/opportunities/<opp_id>/tags/<tag_id>
class TagsByOpportunityResource(Resource):
    def get(self, opp_id, tag_id=None):
        return jsonify([x.serialize for x in OpportunityPost.query.get(opp_id).tags])
    
    def put(self, opp_id, tag_id=None):
        opportunity = OpportunityPost.query.get(opp_id)
        #tag = Tag.query.get(tag_id)
        
        if current_user.is_authenticated and opportunity.organization in current_user.organizations:
            content = request.json
            for x in range (0, len(content)):
                tag = Tag(**content[x])
                
                try:
                    existingTag = Tag.query.filter_by(name = tag.name).one()
                    tag = existingTag
                except:
                    pass
                                    
                opportunity.tags.append(tag)
                
            db.session.commit()
            return "", 200
        else:
            return "", 401
        
    def delete(self, opp_id, tag_id):
        opportunity = OpportunityPost.query.get(opp_id)
        tag = Tag.query.get(tag_id)
        
        if current_user.is_authenticated and opportunity.organization in current_user.organizations:
            opportunity.tags.remove(tag)
                
            db.session.commit()
            return "", 200
        else:
            return "", 401
        
# /api/activities/<act_id>/tags/<tag_id>
class TagsByActivityResource(Resource):
    def get(self, act_id, tag_id=None):
        return jsonify([x.serialize for x in ActivityPost.query.get(act_id).tags])
    
    def put(self, act_id, tag_id=None):
        activity = ActivityPost.query.get(act_id)
        #tag = Tag.query.get(tag_id)
        
        if current_user.is_authenticated and activity in current_user.activity_posts:
            content = request.json
            for x in range (0, len(content)):
                tag = Tag(**content[x])
                
                try:
                    existingTag = Tag.query.filter_by(name = tag.name).one()
                    tag = existingTag
                except:
                    pass
                                    
                activity.tags.append(tag)
                
            db.session.commit()
            return "", 200
        else:
            return "", 401
        
    def delete(self, act_id, tag_id):
        activity = ActivityPost.query.get(act_id)
        tag = Tag.query.get(tag_id)
        
        if current_user.is_authenticated and activity in current_user.activity_posts:
            activity.tags.remove(tag)
                
            db.session.commit()
            return "", 200
        else:
            return "", 401

# /api/tags/<tag_id>/opportunities/
class OpportunityByTagResource(Resource):
    def get(self, tag_name):        
        tag_id = Tag.query.filter_by(name = tag_name).one().id
        return jsonify([x.serialize for x in Tag.query.get(tag_id).opportunities])
    
# /api/tags/<tag_id>/activities/
class ActivityByTagResource(Resource):
    def get(self, tag_name):
        tag_id = Tag.query.filter_by(name = tag_name).one().id
        return jsonify([x.serialize for x in Tag.query.get(tag_id).activities])

        