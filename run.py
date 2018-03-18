from app import app as application, db
from app.modules.tag import Tag

if __name__ == "__main__":
    application.config.from_object('config.DevelopmentConfig')
    db.create_all()
    
    if not Tag.query.all():
        for tagname in ["Manual labour", "People", "Animals"]:
            db.session.add(Tag(name=tagname))
        db.session.commit()
    
    application.run(host=application.config['HOST'], port=application.config['PORT'])
