import unittest
import urllib2
import time

from flask import Flask
from flask import url_for
from flask_testing import LiveServerTestCase
from selenium import webdriver
from app import app, db
from app.modules.user.models import User 

#setting variables for test user 1
test_user1_username = "TestUserName"
test_user1_fullname = "TestFullName"
test_user1_email = "TestEmail"
test_user1_password = "TestPassword"
test_user1_gender = True
test_user1_agreed = True

class TestBase(LiveServerTestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config.from_object('config.TestingConfig')
        return app
    
    def setUp(self):
        """Setup the test driver and create test users"""
        self.driver = webdriver.Chrome()
        self.driver.get(self.get_server_url())

        db.session.commit()
        db.drop_all()
        db.create_all()

        # create test employee user
        self.user = User(username=test_user1_username,
                                email=test_user1_email,
                                password=test_user1_password,
                                fullname=test_user1_fullname,
                                gender=test_user1_gender,
                                agreedToTerms=test_user1_agreed,
                                enabled=True,                                                                
                                 )

        # save users to database
        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        self.driver.quit()

    def test_server_is_up_and_running(self):
        response = urllib2.urlopen(self.get_server_url())
        self.assertEqual(response.code, 200)  
        
class TestBaseRegistration(TestBase):
    
    def test_registration(self):
        """Tests that a user can register an OVON account through the registration page"""
        
        #click register link
        self.driver.find_element_by_id("register_link").click()
        time.sleep(1)
        
        #fill out registration form
        self.driver.find_element_by_id("reg_username").send_keys(test_user1_username)
        self.driver.find_element_by_id("reg_password").send_keys(test_user1_password)
        self.driver.find_element_by_id("reg_password_confirm").send_keys(test_user1_password)
        self.driver.find_element_by_id("reg_email").send_keys(test_user1_email)
        self.driver.find_element_by_id("reg_fullname").send_keys(test_user1_fullname)
        self.driver.find_element_by_id("male").click()
        self.driver.find_element_by_id("reg_agree").click()
        self.driver.find_element_by_id("registration_submit").click()
        time.sleep(1)
        
        #assert successful registration
        success_message = self.driver.find_element_by_class_name("alert").text
        assert "Account created successfully!" in success_message
        
        
if __name__ == '__main__':
    unittest.main()