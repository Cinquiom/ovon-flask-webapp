from app import app as application, db

if __name__ == "__main__":
    application.config.from_object('config.DevelopmentConfig')
    db.create_all()
    
    application.run(host=application.config['HOST'], port=application.config['PORT'])
