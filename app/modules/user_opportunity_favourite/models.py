# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db

# User likes an opportunity        
class UserOpportunityFave(db.Model):

    __tablename__       = 'user_opportunity_favs'
    __table_args__      = (db.UniqueConstraint('user_id', 'opportunity_id', name='_user_opp_fav_uc'),)
    
    user_id             = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    opportunity_id      = db.Column(db.Integer, db.ForeignKey('opportunity_posts.id'), primary_key=True)
    
    user                = db.relationship("User", backref='fave_opportunities', lazy=True)
    opportunity         = db.relationship("OpportunityPost", backref='users_faved', lazy=True)
    
    def __repr__(self):
        return '<Like %s for %s>' % (self.user.name, self.opportunity.id)
       
    @property
    def serialize(self):
        return {
            "user": self.user.username,
            "opportunity": self.opportunity.serialize
            }
