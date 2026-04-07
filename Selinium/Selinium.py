from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time  # Moved to the top

# 1. Initialize the driver
driver = webdriver.Chrome()
driver.get('https://www.google.com')

# 2. Set up the wait object
wait = WebDriverWait(driver, 10)

try:
    # 3. Perform the search
    # This waits up to 10 seconds for the search box to appear
    search_box = wait.until(EC.presence_of_element_located((By.NAME, 'q')))
    search_box.send_keys('selenium')
    search_box.submit()
    
    # Pause to see the search results
    time.sleep(5)

    # 4. Navigation commands
    print("Navigating back...")
    driver.back()
    time.sleep(3)  # Wait to see the home page again
    
    print("Navigating forward...")
    driver.forward()
    time.sleep(3)  # Wait to see the search results again

finally:
    # 5. Proper Cleanup
    # Putting this in 'finally' ensures the browser closes even if an error occurs
    print("Closing browser.")
    driver.quit()
