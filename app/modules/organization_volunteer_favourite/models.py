# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db

# Organization likes a volunteer        
class OrganizationVolunteerFave(db.Model):

    __tablename__       = 'organization_volunteer_favs'
    __table_args__      = (db.UniqueConstraint('org_id', 'volunteer_id', name='_org_volunteer_fav_uc'),)
    
    org_id             = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    volunteer_id      = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    
    organization    = db.relationship("Organization", backref='fave_volunteers', lazy=True)
    volunteer         = db.relationship("User", backref='orgs_faved', lazy=True)
    
    def __repr__(self):
        return '<Like %s for %s>' % (self.organization.name, self.volunteer.user_id)
       
    @property
    def serialize(self):
        return {
            "organization": self.organization.name,
            "volunteer": self.volunteer.serialize
            }
