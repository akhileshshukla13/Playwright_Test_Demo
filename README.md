# Automation using playwright
This project is created to demo UI automation using Playwright. Below are important spec files which are creted as a part of this project:
1. saucelabsdemo.spec.js  
2. storageStateDemo.spec.js 
3. demoToGenerateHARFile.spec.js

# Short Info on each spec file
1. saucelabsdemo.spec.js 
   - This spec file is created to demo UI automation of the website https://www.saucedemo.com/ using playwright
   - POM design pattern is used here
   - You can find all the locators within the 'pageObjects' folder
   - All the fixtures are present within the folder 'test-data' folder
   - We have used hooks like beforeEach.
   - We have used loggers to create the logs
   - We are having utility methods to do common things
   - We have also written a utility that will write the prices of the products into a sheet


2. storageStateDemo.spec.js 
   - This spec file is created to demo the sessionState functionality that is available within the Playwright

3. demoToGenerateHARFile.spec.js
   - This spec file is created to demo how we can generate the HAR file using Playwright which will be further useful for the Network replay

# Important things that you need to do have before you start playing with this project
 - Node
 - GIT
 - Any IDE of your choice(VS Code is preffered)
 - Make sure your environment files are updated as per your OS
 - Please do 'npm install' once all the required setup is done in your system

# Additional info
There are different features that are available within this project. Below explanation will give you brief idea about the same along with the commands that are required to consume the same:

1. Allure report
  - In this project we are going to use Alluere reports for reporting purposes
  - A folder with the name 'allure-results' should be present within your main project
  - Please run the commands in the below flow to generate the allure report:
    - npm run allureCommandOne
    - npm run allureCommandTwo
    - npm run allureCommandThree
    - You will be able to see the allure reports getting served in the browser

2. Code coverage report
  - We have used nyc(successor of istanbul) to generate the code coverage report
  - You can run the below commands to generate the same:
    - npm run code-coverage-check
  - Please open the html file present at the path \automation-playwright\coverage\lcov-report\index.html in any browser of your choice and you can further drill down to see how much code coverage can be improved

3. Test observability using browser stack
  - To use the feature of test-observability please create an account in browserstack it will provide you some amount free minutes so you play around with it for generating reports for your test automation runs
  - Please follow below steps to generate the Test observability report
    - npm i -D browserstack-node-sdk
    - npm list browserstack-node-sdk
    - npx setup --username 'your_browser_stack_username' --key 'your_browser_stack_key'
    - A browser yml file will be generated after the above commands
    - In the 'browserstack.yml' file please provide the 'buildName' and 'projectName' both will be static names
    - Run npx browserstack-node-sdk

4. Har file generation
  - A spec file will be generate after in 'har' folder once you run the 'demoToGenerateHARFile.spec.js' spec file
  - This can be further imported to Postman to mimic the UI use case via API calls