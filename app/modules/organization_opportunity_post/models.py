from app import db

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
    
    @property
    def serialize(self):
        return {
            "id": self.id,
            "organization": self.organization.name,
            "description": self.description,
            "location": self.location,
            "when": self.when,
            "phone": self.organization.phone,
            "email": self.organization.email
            }
    
