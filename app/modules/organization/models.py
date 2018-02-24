from app import db

class Organization(db.Model):

    __tablename__ = 'organizations'
    __table_args__ = {'extend_existing': True} 
    
    id              = db.Column(db.Integer, primary_key=True)
    name            = db.Column(db.String(128), nullable=False)
    email            = db.Column(db.String(128), nullable=False)
    phone            = db.Column(db.String(128), nullable=False)
    owner_id        = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner           = db.relationship("User", backref='organizations', lazy=True) 


    def __repr__(self):
        return '<Organization %r>' % (self.name)   
    
    def __getitem__(self, item):
        return getattr(self, item)  
    
    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "owner": self.owner.fullname
            }
