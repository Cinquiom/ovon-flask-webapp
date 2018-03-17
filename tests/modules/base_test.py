from threading import Thread

from app import  app, db

class OVONTestServer(object):

    def __init__(self, host, port):
        
        self.host = host
        self.port = port
        
        def start_test_server():
            app.config.from_object('config.TestingConfig')
            db.create_all()
            app.run(host=self.host, port=self.port)
            
        t = Thread(target=start_test_server)
        t.daemon = True
        t.start()

