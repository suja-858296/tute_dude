from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 1. Initialize the driver
driver = webdriver.Chrome()
driver.maximize_window()

try:
    # 2. Open the website
    driver.get('https://www.amazon.in')

    # 3. Setup an Explicit Wait (waits up to 10 seconds for elements to appear)
    wait = WebDriverWait(driver, 1000)

    # 4. Find the search box using the modern By.ID method
    search_box = wait.until(EC.presence_of_element_located((By.ID, "twotabsearchtextbox")))
    search_box.send_keys('iphones')

    # 5. Find and click the search button
    search_button = driver.find_element(By.ID, "nav-search-submit-button")
    search_button.click()

    # Optional: Wait to see the results
    wait.until(EC.title_contains("iphones"))
    print("Search completed successfully!")

finally:
    # 6. Always quit the driver to free up memory/processes
    # driver.quit() 
    pass
