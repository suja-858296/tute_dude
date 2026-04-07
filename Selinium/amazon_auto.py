from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 1. Initialize the driver
driver = webdriver.Chrome()
driver.get('https://www.amazon.in')
driver.maximize_window() # Fixed the typo here

# 2. Wait for the page to load
time.sleep(3) # Changed 1000 to 3

try:
    # 3. Click Electronics
    # Using the updated syntax: find_element(By.LINK_TEXT, ...)
    select = driver.find_element(By.LINK_TEXT, 'Electronics')
    select.click()
    
    time.sleep(5)

    # 4. Click Audio
    select_1 = driver.find_element(By.LINK_TEXT, 'Audio')
    select_1.click()
    
    # Keep open for a bit to see the result
    time.sleep(5)

finally:
    driver.quit()