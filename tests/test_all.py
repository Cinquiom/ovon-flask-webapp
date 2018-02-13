import unittest, os
 
from tests.modules import *  # @UnusedWildImport

if __name__ == "__main__":
    unittest.main()
    
    if os.path.exists("app_test.db"):
        os.remove("app_test.db")