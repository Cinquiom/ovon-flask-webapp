# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Define a User model
class User(UserMixin, db.Model):

    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True} 
    
    id       = db.Column(db.Integer, primary_key=True)

    # User Name
    username    = db.Column(db.String(128),  nullable=False)

    # Identification Data: email & password
    email    = db.Column(db.String(128),  nullable=False,
                                            unique=True)
    password = db.Column(db.String(192),  nullable=False)
    
    fullname = db.Column(db.String(192),  nullable=False)
    
    gender = db.Column(db.Boolean, nullable=False)
    
    agreedToTerms = db.Column(db.Boolean, nullable=False)
    
    enabled = db.Column(db.Boolean, nullable=False)
    
    verify_code =  db.Column(db.String(192),  nullable=True)
    
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())

    # New instance instantiation procedure
    def __init__(self, username, email, password, fullname, gender,
                  agreedToTerms, enabled):

        self.username   = username
        self.email    = email
        self.fullname = fullname
        self.gender = gender
        self.agreedToTerms = agreedToTerms
        self.set_password(password)
        self.enabled = True
        self.verify_code=None
        self.enabled=enabled

    def __repr__(self):
        return '<User %r>' % (self.name)     
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def __getitem__(self, item):
        return getattr(self, item)
    
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
