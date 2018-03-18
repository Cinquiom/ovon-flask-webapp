from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

"""these tests were exported from recordings made using the Katalon Automation Recorder based on the Selenium IDE"""

class RegisterUser(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_register_new_user(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/register")
        driver.find_element_by_id("reg_username").click()
        driver.find_element_by_id("reg_username").clear()
        driver.find_element_by_id("reg_username").send_keys("testUser")
        driver.find_element_by_id("reg_password").click()
        driver.find_element_by_id("reg_password").clear()
        driver.find_element_by_id("reg_password").send_keys("testPassword")
        driver.find_element_by_id("reg_password_confirm").click()
        driver.find_element_by_id("reg_password_confirm").clear()
        driver.find_element_by_id("reg_password_confirm").send_keys("testPassword")
        driver.find_element_by_id("reg_email").click()
        driver.find_element_by_id("reg_email").clear()
        driver.find_element_by_id("reg_email").send_keys("testEmail@email.net")
        driver.find_element_by_id("reg_fullname").click()
        driver.find_element_by_id("reg_fullname").clear()
        driver.find_element_by_id("reg_fullname").send_keys("test Fullname")
        driver.find_element_by_xpath("//form[@id='register-form']/div[2]/div/div[6]/label").click()
        driver.find_element_by_xpath("//form[@id='register-form']/div[2]/div/div[7]/label").click()
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/login", driver.current_url)
        
    def test_register_existing_user(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/register")
        driver.find_element_by_id("reg_username").click()
        driver.find_element_by_id("reg_username").clear()
        driver.find_element_by_id("reg_username").send_keys("testUser")
        driver.find_element_by_id("reg_password").click()
        driver.find_element_by_id("reg_password").clear()
        driver.find_element_by_id("reg_password").send_keys("testPassword")
        driver.find_element_by_id("reg_password_confirm").click()
        driver.find_element_by_id("reg_password_confirm").clear()
        driver.find_element_by_id("reg_password_confirm").send_keys("testPassword")
        driver.find_element_by_id("reg_email").click()
        driver.find_element_by_id("reg_email").clear()
        driver.find_element_by_id("reg_email").send_keys("testEmail@email.net")
        driver.find_element_by_id("reg_fullname").click()
        driver.find_element_by_id("reg_fullname").clear()
        driver.find_element_by_id("reg_fullname").send_keys("test Fullname")
        driver.find_element_by_xpath("//form[@id='register-form']/div[2]/div/div[6]/label").click()
        driver.find_element_by_xpath("//form[@id='register-form']/div[2]/div/div[7]/label").click()
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/register", driver.current_url)
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)
        
        
class LoginUser(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_login_user_valid(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/login")
        driver.find_element_by_id("username").click()
        driver.find_element_by_id("username").clear()
        driver.find_element_by_id("username").send_keys("testUser")
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").clear()
        driver.find_element_by_id("password").send_keys("testPassword")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        self.assertEqual("http://localhost:8090/#/opportunities", driver.current_url)
        self.assertNotEqual(None, driver.get_cookie("loggedInAlready"))
        
    def test_login_user_invalid_password(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/login")
        driver.find_element_by_id("username").click()
        driver.find_element_by_id("username").clear()
        driver.find_element_by_id("username").send_keys("testUser")
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").clear()
        driver.find_element_by_id("password").send_keys("testInvalidPassword")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        self.assertEqual("http://localhost:8090/#/login", driver.current_url)
        self.assertEqual(None, driver.get_cookie("loggedInAlready"))
        
    def test_login_user_invalid_username(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/login")
        driver.find_element_by_id("username").click()
        driver.find_element_by_id("username").clear()
        driver.find_element_by_id("username").send_keys("testInvalidUser")
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").click()
        driver.find_element_by_id("password").clear()
        driver.find_element_by_id("password").send_keys("testPassword")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        self.assertEqual("http://localhost:8090/#/login", driver.current_url)
        self.assertEqual(None, driver.get_cookie("loggedInAlready"))
        
    def test_logout(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/profile")
        driver.find_element_by_xpath("//li[6]/button").click()
        self.assertEqual("http://localhost:8090/#/login", driver.current_url)
        self.assertEqual(None, driver.get_cookie("loggedInAlready"))
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)
        
class EnterVolunteerPool(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_enter_volunteer_pool_valid(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/opportunities")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("post_availability").click()
        driver.find_element_by_id("post_availability").clear()
        driver.find_element_by_id("post_availability").send_keys("several dates and times")
        driver.find_element_by_id("post_description").click()
        driver.find_element_by_id("post_description").clear()
        driver.find_element_by_id("post_description").send_keys("I am a test for valid volunteer pool entry")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/volunteers", driver.current_url)
        
    def test_enter_volunteer_pool_missing_description(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/opportunities")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("post_availability").click()
        driver.find_element_by_id("post_availability").clear()
        driver.find_element_by_id("post_availability").send_keys("several dates and times")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/createvolunteerpost", driver.current_url)
        
    def test_enter_volunteer_pool_missing_availability(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/opportunities")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("post_description").click()
        driver.find_element_by_id("post_description").clear()
        driver.find_element_by_id("post_description").send_keys("I am a test for valid volunteer pool entry")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/createvolunteerpost", driver.current_url)
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)
        
class RegisterOrganization(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_register_organization_valid(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/profile")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("org_name").click()
        driver.find_element_by_id("org_name").clear()
        driver.find_element_by_id("org_name").send_keys("test Organization")
        driver.find_element_by_id("org_email").click()
        driver.find_element_by_id("org_email").clear()
        driver.find_element_by_id("org_email").send_keys("testOrgEmail@email.net")
        driver.find_element_by_id("org_phone").click()
        driver.find_element_by_id("org_phone").clear()
        driver.find_element_by_id("org_phone").send_keys("1234567890")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/profile", driver.current_url)
        
    def test_register_organization_missing_name(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/profile")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("org_email").click()
        driver.find_element_by_id("org_email").clear()
        driver.find_element_by_id("org_email").send_keys("testOrgEmail@email.net")
        driver.find_element_by_id("org_phone").click()
        driver.find_element_by_id("org_phone").clear()
        driver.find_element_by_id("org_phone").send_keys("1234567890")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/registerorganization", driver.current_url)
        
    def test_register_organization_invalid_email(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/profile")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("org_name").click()
        driver.find_element_by_id("org_name").clear()
        driver.find_element_by_id("org_name").send_keys("test Organization")
        driver.find_element_by_id("org_email").click()
        driver.find_element_by_id("org_email").clear()
        driver.find_element_by_id("org_email").send_keys("testOrgInvalidEmail")
        driver.find_element_by_id("org_phone").click()
        driver.find_element_by_id("org_phone").clear()
        driver.find_element_by_id("org_phone").send_keys("1234567890")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/registerorganization", driver.current_url)
        
    def test_register_organization_invalid_phone(self):
        driver = self.driver
        driver.get("http://localhost:8090/#/profile")
        driver.find_element_by_xpath("//li[4]/button").click()
        driver.find_element_by_id("org_name").click()
        driver.find_element_by_id("org_name").clear()
        driver.find_element_by_id("org_name").send_keys("test Organization")
        driver.find_element_by_id("org_email").click()
        driver.find_element_by_id("org_email").clear()
        driver.find_element_by_id("org_email").send_keys("testOrgEmail@email.net")
        driver.find_element_by_id("org_phone").click()
        driver.find_element_by_id("org_phone").clear()
        driver.find_element_by_id("org_phone").send_keys("123456789")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertEqual("http://localhost:8090/#/registerOrganization", driver.current_url)
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
