import unittest
 
from app import app, db
from copy import deepcopy
from app.modules.user import User
from sqlite3 import IntegrityError
 
class UserTests(unittest.TestCase):
    
    GOOD_USER_1 = User(
                username        = "testuser",
                email           = "testuser@test.com",
                password        = "testpassword",
                fullname        = "Test User",
                gender          = True,
                agreedToTerms   = True
            )
    
    GOOD_USER_2 = User(
                username        = "testuser2",
                email           = "testuser2@test.com",
                password        = "testpassword",
                fullname        = "Test User 2",
                gender          = True,
                agreedToTerms   = True
            )
 
    def setUp(self):
        app.config.from_object('config.TestingConfig')
        db.create_all()
 
    def tearDown(self):
        pass
 
    def test_make_user(self):
        db.session.add(self.GOOD_USER_1)
        db.session.commit()

        self.assertEqual(self.GOOD_USER_1.id, 1)
        
    def test_add_duplicate_user(self):

        BAD_USER = deepcopy(self.GOOD_USER_1)

        db.session.add(self.GOOD_USER_1)
        db.session.commit()
        
        try:
            db.session.add(BAD_USER)
            db.session.commit()
        except IntegrityError:
            pass
        else:
            raise Exception("Failed to prevent duplicate user from being made")

if __name__ == "__main__":
    unittest.main()