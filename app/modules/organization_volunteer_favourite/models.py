# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
from app.modules.rating.models import UserToOrganizationRate

# Organization likes a volunteer        
class OrganizationVolunteerFave(db.Model):

    __tablename__       = 'organization_volunteer_favs'
    __table_args__      = (db.UniqueConstraint('org_id', 'volunteer_id', name='_org_volunteer_fav_uc'),)
    
    org_id             = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    volunteer_id      = db.Column(db.Integer, db.ForeignKey('activity_posts.user_id'), primary_key=True)
    
    organization    = db.relationship("Organization", backref='fave_volunteers', lazy=True)
    volunteer         = db.relationship("ActivityPost", backref='orgs_faved', lazy=True)
    
    def __repr__(self):
        return '<Like %s for %s>' % (self.organization.name, self.volunteer.user_id)
    
    def getAverageRating(self, organization_id):
        ratings = [x.serialize for x in UserToOrganizationRate.query.filter_by(organization_id=organization_id).all()]
        #computing average of the ratings to send with the list of ratings
        ratingSum = 0;
        if len(ratings) > 0:
            for x in range (0, len(ratings)):
                ratingSum += ratings[x].get('rating')
            return (ratingSum/len(ratings))
        else:
            return ratingSum
       
    @property
    def serialize(self):
        return {
            "organization": self.organization.serialize,
            "volunteer": self.volunteer.serialize,
            "averageRating": self.getAverageRating(self.org_id)
            }
