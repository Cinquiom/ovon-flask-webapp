from app import app as application

if __name__ == "__main__":
    application.config.from_object('config.DevelopmentConfig')
    application.run(host=application.config['HOST'], port=application.config['PORT'])
