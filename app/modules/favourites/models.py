from app import db
from app.modules.user import User
from app.modules.organization import Organization

user_likes_opportunity_association_table = db.Table('user_likes_opportunity_map', db.Model.metadata,
    db.Column('user_id',        db.Integer, db.ForeignKey('users.id')),
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity_posts.id'))
)
User.favourites = db.relationship("OpportunityPost", 
                                              secondary=lambda: user_likes_opportunity_association_table,
                                              backref="favourited_by")

organization_likes_user_association_table = db.Table('organization_likes_user_map', db.Model.metadata,
    db.Column('organization_id',    db.Integer, db.ForeignKey('organizations.id')),
    db.Column('user_id',         db.Integer, db.ForeignKey('users.id'))
)
Organization.favourites = db.relationship("User", 
                                           secondary=lambda: organization_likes_user_association_table,
                                           backref="favourited_by")