from app import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):

    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True} 
    
    id              = db.Column(db.Integer, primary_key=True)
    username        = db.Column(db.String(128), nullable=False, unique=True)
    email           = db.Column(db.String(128), nullable=False, unique=True)
    password_hash   = db.Column(db.String(192), nullable=False)
    fullname        = db.Column(db.String(192), nullable=False)
    gender          = db.Column(db.Boolean, nullable=False)
    #agreedToTerms   = db.Column(db.Boolean, nullable=False)
    enabled         = db.Column(db.Boolean, nullable=False)
    verify_code     = db.Column(db.String(192), nullable=True)
    date_created    = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified   = db.Column(db.DateTime, default=db.func.current_timestamp(),
                                            onupdate=db.func.current_timestamp())
    bio             = db.Column(db.String(192), nullable=True)
    avatar = db.Column(db.String(128), nullable=True)
    resume = db.Column(db.String(128), nullable=True)  

    # New instance instantiation procedure
    def __init__(self, username, email, password, fullname, gender):

        self.username     = username
        self.email    = email
        self.fullname = fullname
        self.gender = gender
        #self.agreedToTerms = agreedToTerms
        self.set_password(password)
        self.enabled = True
        self.verify_code=None
        self.bio = None

    def __repr__(self):
        return '<User %r>' % (self.name)   
    
    def __getitem__(self, item):
        return getattr(self, item)  
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def set_fullName(self, name):
        self.fullname = name
        
    def set_email(self, email):
        self.email = email
        
    def set_bio(self, bio):
        self.bio = bio
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @property
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "fullname": self.fullname,
            "date_created": self.date_created,
            "gender": "Male" if self.gender else "Female",
            "bio": self.bio
            }
    
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
