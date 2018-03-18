from app import db
from app.modules.user_activity_post import ActivityPost
from app.modules.organization_opportunity_post import OpportunityPost

class Tag(db.Model):

    __tablename__       = 'tags'
    
    id       = db.Column(db.Integer, primary_key=True)
    name     = db.Column(db.String(48), nullable=False)
    
    def __repr__(self):
        return '<Tag %s %s>' % (self.id, self.name)
       
    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
            }

tag_opportunity_association_table = db.Table('tag_opportunity_map', db.Model.metadata,
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity_posts.id')),
    db.Column('tag_id',         db.Integer, db.ForeignKey('tags.id'))
)
OpportunityPost.tags = db.relationship("Tag", secondary=lambda: tag_opportunity_association_table,backref="opportunities")

tag_activity_association_table = db.Table('tag_activity_map', db.Model.metadata,
    db.Column('activity_id',    db.Integer, db.ForeignKey('activity_posts.id')),
    db.Column('tag_id',         db.Integer, db.ForeignKey('tags.id'))
)
ActivityPost.tags = db.relationship("Tag", secondary=lambda: tag_activity_association_table,backref="activities")
