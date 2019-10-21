const { validateCsv1 } = require('./validate-csv.js');
const  CONFIG  = require('../config/config-tax.json')

exports.calculator1 = (response) => {
  const outputArray = [];

  for (let rowNo = 1; rowNo < response.length; rowNo += 1) {
    const array = response[rowNo];
    const empObj = {};

    const fNameValidation = validateCsv1(array, 0);
    const lNameValidation = validateCsv1(array, 1);
    const payPeriodValidation = validateCsv1(array, 4);
    const salaryValidation = validateCsv1(array, 2);
    const superValidation = validateCsv1(array, 3);

    if (fNameValidation === 1|| lNameValidation === 1 ) empObj.name = 'Error in input';
    else empObj.name = `${array[0]} ${array[1]}`;


    if (payPeriodValidation === 1 ) empObj['pay-period'] = 'Error in input';
    else empObj['pay-period'] = `${array[4]}`;

    if (salaryValidation === 1 ) {
      empObj['gross-income'] = 'Error in input';
      empObj['income-tax'] = 'Error in input';
      empObj['net-income'] = 'Error in input';
      empObj['super-amount'] = 'Error in input';
    } else {
      const aSalary = parseInt(array[2], 10);
      let tax;

      if (aSalary >= CONFIG.taxClassOneMin && aSalary <= CONFIG.taxClassOneMax) tax = null;
      else if (aSalary >= CONFIG.taxClassTwoMin && aSalary <= CONFIG.taxClassTwoMax) tax = CONFIG.minTaxClassOne + (aSalary - CONFIG.taxClassOneMax) * CONFIG.taxPercClassTwo;
      else if (aSalary >= CONFIG.taxClassThreeMin && aSalary <= CONFIG.taxClassThreeMax) tax = CONFIG.minTaxClassTwo + (aSalary - CONFIG.taxClassTwoMax) * CONFIG.taxPercClassThree;
      else if (aSalary >= CONFIG.taxClassFourMin && aSalary <= CONFIG.taxClassFourMax) tax = CONFIG.minTaxClassThree + (aSalary - CONFIG.taxClassThreeMax) * CONFIG.taxPercClassFour;
      else if (aSalary >= CONFIG.taxClassFiveMin) tax = CONFIG.minTaxClassFour + (aSalary - CONFIG.taxClassFourMax) * CONFIG.taxPercClassFive;

      empObj['gross-income'] = Math.round(aSalary / 12);
      empObj['income-tax'] = Math.round(tax / 12);
      empObj['net-income'] = empObj['gross-income'] - empObj['income-tax'];

      if (superValidation === 1 ) empObj['super-amount'] = 'Error in input';
      else empObj['super-amount'] = Math.round(empObj['gross-income'] * parseFloat(array[3].replace('%', '') / 100));
    }


    outputArray.push(empObj);
  }

  const output = JSON.stringify(outputArray);
  // console.log(output);
  return output;
};
