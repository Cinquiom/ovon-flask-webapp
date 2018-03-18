import unittest

from app import db
from app.modules.user import User
from app.modules.user_activity_post import ActivityPost
from app.modules.organization import Organization
from app.modules.organization_opportunity_post import OpportunityPost
from app.modules.tag import Tag

class TagTests(unittest.TestCase):

    USER = User(
            username        = "TagTestsUser",
            email           = "tagtestuser@test.com",
            password        = "testpassword",
            fullname        = "Test User",
            gender          = True,
            agreedToTerms   = True
        )
    TAG = Tag(name="testtag")
    
    
    def setUp(self):
        db.create_all()
        db.session.add(self.USER)
        db.session.add(self.TAG)
        db.session.commit()

    def tearDown(self):
        pass


    def test_add_tag_to_activity(self):
        a = ActivityPost(availability="anytime", description="desc")
        
        self.USER.activity_posts.append(a)

        a.tags.append(self.TAG)
        
        db.session.add(a)
        db.session.commit()
        
        tag = Tag.query.get(self.TAG.id)
        activity = ActivityPost.query.get(a.id)
        
        self.assertIn(tag, activity.tags)
        self.assertIn(activity, tag.activities)
        
    def test_add_tag_to_opportunity(self):
        o = Organization(name="O", email = "e@h.c", phone="1234567890")
        op = OpportunityPost(location="123 Fake Street", description="A description", when="now")
        
        self.USER.organizations.append(o)
        o.opportunities.append(op)
        
        op.tags.append(self.TAG)
        
        db.session.add(o)
        db.session.add(op)
        db.session.commit()
        
        tag = Tag.query.get(self.TAG.id)
        opportunity = OpportunityPost.query.get(op.id)
        
        self.assertIn(tag, opportunity.tags)
        self.assertIn(opportunity, tag.opportunities)


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()