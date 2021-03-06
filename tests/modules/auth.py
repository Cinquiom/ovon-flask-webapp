import unittest
 
from app import app, db
 
class AuthTests(unittest.TestCase):
 
    def setUp(self):
        app.config.from_object('config.TestingConfig')
        self.app = app.test_client()
        db.create_all()
 
    def tearDown(self):
        pass
 
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        

 

if __name__ == "__main__":
    unittest.main()