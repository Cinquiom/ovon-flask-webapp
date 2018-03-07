# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db

# User rates an organization        
class UserToOrganizationRate(db.Model):

    __tablename__       = 'user_to_organization_ratings'
    __table_args__      = (db.UniqueConstraint('user_id', 'organization_id', name='_user_org_rate_uc'),)
    
    user_id             = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    organization_id     = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    rating 	            = db.Column(db.Integer)
    
    user                = db.relationship("User", backref='rated_organizations', lazy=True)
    organization        = db.relationship("Organization", backref='users_rated_by', lazy=True)
    
    def __repr__(self):
        return '<Rating %s for %s>' % (self.user.name, self.organization.username)
       
    @property
    def serialize(self):
        return {
            "user": self.user.username,
            "organization": self.organization.name,
            "rating": self.rating
            }

# Organization rates a user
class OrganizationToUserRate(db.Model):

    __tablename__       = 'organization_to_user_ratings'
    __table_args__      = (db.UniqueConstraint('organization_id', 'user_id', name='_org_user_rate_uc'),)
    
    user_id             = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    organization_id     = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    rating              = db.Column(db.Integer)
    
    user                = db.relationship("User", backref='organizations_rated_by', lazy=True)
    organization        = db.relationship("Organization", backref='rated_users', lazy=True)
    
    def __repr__(self):
        return '<Rating %s for %s>' % (self.organization.name, self.user.username)
       
    @property
    def serialize(self):
        return {
            "user": self.user.username,
            "organization": self.organization.name,
            "rating": self.rating
            }
