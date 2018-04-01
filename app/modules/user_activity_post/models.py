from app import db
from app.modules.user import User
from app.modules.rating import OrganizationToUserRate

User.activity_posts = db.relationship("ActivityPost", backref="users", lazy=True)

class ActivityPost(db.Model):

    __tablename__ = 'activity_posts'
    __table_args__ = {'extend_existing': True} 
    
    id       = db.Column(db.Integer, primary_key=True)

    availability = db.Column(db.String(192),  nullable=False)
    description = db.Column(db.String(192),  nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    user = db.relationship("User")
    
    
    def __repr__(self):
        return '<ActivityPost %r %s>' % (self.id, self.user.username)    
    
    def __getitem__(self, item):
        return getattr(self, item)
    
    def get_average_rating(self, user_id):
        ratings = [x.serialize for x in OrganizationToUserRate.query.filter_by(user_id=user_id).all()]
        rating_sum = sum(r['rating'] for r in ratings)
        try:
            return (rating_sum/len(ratings))
        except ZeroDivisionError:
            return 0
    
    @property
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "description": self.description,
            "availability": self.availability,
            "user": self.user.username,
            "fullName": self.user.fullname,
            "email": self.user.email,
            "averageRating": self.get_average_rating(self.user_id),
            "isCurrentUsersVolunteerPost": False
            }
    

        
