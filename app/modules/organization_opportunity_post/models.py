from app import db
from app.modules.rating.models import UserToOrganizationRate

class OpportunityPost(db.Model):

    __tablename__ = 'opportunity_posts'
    __table_args__ = {'extend_existing': True} 
    
    id       = db.Column(db.Integer, primary_key=True)

    location = db.Column(db.String(192),  nullable=False)
    description = db.Column(db.String(192),  nullable=False)
    when = db.Column(db.String(192),  nullable=False)
    
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'))
    
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    organization = db.relationship("Organization", backref = "opportunities", lazy=True)
    
    
    def __repr__(self):
        return '<Organization %r %s>' % (self.id, self.organization.name)    
    
    def __getitem__(self, item):
        return getattr(self, item)
    
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
            "id": self.id,
            "organization": self.organization.name,
            "description": self.description,
            "location": self.location,
            "when": self.when,
            "phone": self.organization.phone,
            "email": self.organization.email,
            "org_id": self.organization_id,
            "averageRating": self.getAverageRating(self.organization_id)
            }
    
