# node_myapp_payslip
# Assumptions
- The client would be able to upload a CSV file in a web page.
- The application should create a monthly payslip in a CSV format for clients to download and would be good to also display it in the web page.
- If a field in a row is invalid, output will display 'Error in input'
- Upload a CSV file with your 'employee' details in the following format:

  - first name, last name, annual salary, super rate (%), payment start date
  - David,Rudd,60050,9%,01 March – 31 March
  - Ryan,Chen,120000,10%,01 March – 31 March

# How to run the application?
- Clone this repo: 
- If you have node.js installed, run `npm install` to install the dependencies in the terminal under the root depository.
- `node code/server.js` to run localhost in your browser.
- In your loacal browser go to http://localhost:3000/
- `npm test` in the terminal under the root depository to run the test harness.

# Technologies involved:
- HTML5
- JavaScript
- jQuery
- Node.js
- Express
- Mocha and Chai for testing

# Dependencies:
- csv-parse: 4.6.3
- express: 4.17.1
- multer: 1.4.2

# Dev Dependencies:
- chai: 4.2.0
- mocha: 6.2.2
- eslint: 6.5.1
- eslint-config-airbnb-base: 14.0.0
- eslint-plugin-import: 2.18.2
- mocha: 6.2.2
- nodemon: 1.19.4
