const chai = require('chai');
const should = require('chai').should();
const  CONFIG  = require('../../config/config-tax.json')

describe('CONFIG', function() {

  
    const array = ['David', 'Rudd', '60050', '9%', '01 March - 31 March' ];
    const aSalary = parseInt(array[2], 10);

  const taxCal = function(aSalary) {
    
    let tax = 0;

    if (aSalary >= CONFIG.taxClassOneMin && aSalary <= CONFIG.taxClassOneMax) tax = null;
    else if (aSalary >= CONFIG.taxClassTwoMin && aSalary <= CONFIG.taxClassTwoMax) tax = CONFIG.minTaxClassOne + (aSalary - CONFIG.taxClassOneMax) * CONFIG.taxPercClassTwo;
    else if (aSalary >= CONFIG.taxClassThreeMin && aSalary <= CONFIG.taxClassThreeMax) tax = CONFIG.minTaxClassTwo + (aSalary - CONFIG.taxClassTwoMax) * CONFIG.taxPercClassThree;
    else if (aSalary >= CONFIG.taxClassFourMin && aSalary <= CONFIG.taxClassFourMax) tax = CONFIG.minTaxClassThree + (aSalary - CONFIG.taxClassThreeMax) * CONFIG.taxPercClassFour;
    else if (aSalary >= CONFIG.taxClassFiveMin) tax = CONFIG.minTaxClassFour + (aSalary - CONFIG.taxClassFourMax) * CONFIG.taxPercClassFive;

    return tax;

  }

  it('should return income tax per year calulated from annual salary', function(){

    taxCal(aSalary).should.equal(11063.25);
 
  })

  it('should return income tax per month', function(){
    
    let taxMonthly = Math.round(taxCal(aSalary)/12);
    taxMonthly.should.equal(922);

  })

  it('should return gross income per month', function(){
    
    let grossIncome = Math.round(aSalary/12);
    grossIncome.should.equal(5004);

  })
  
  it('should return net income per month', function(){
    
    let netIncome = Math.round(aSalary/12) - Math.round(taxCal(aSalary)/12);
    netIncome.should.equal(4082);

  })
  
  it('should return super amount per month', function(){
    
    let superAmount = Math.round((aSalary/12) * parseFloat(array[3].replace('%', '') / 100));
    superAmount.should.equal(450);

  })

  


});