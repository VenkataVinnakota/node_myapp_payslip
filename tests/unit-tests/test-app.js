const chai = require('chai');
const should = require('chai').should();
const { calculator1 } = require('../../code/calculator.js');


describe('calculator1', function(){
  
  it('should create a json string version of payslip', function(){

    const array = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'David', 'Rudd', '60050', '9%', '01 March - 31 March' ],
      [ 'Ryan', 'Chen', '120000', '10%', '01 March - 31 March' ]
    ];

    calculator1(array).should.equal(
      '[{"name":"David Rudd","pay-period":"01 March - 31 March","gross-income":5004,"income-tax":922,"net-income":4082,"super-amount":450},{"name":"Ryan Chen","pay-period":"01 March - 31 March","gross-income":10000,"income-tax":2669,"net-income":7331,"super-amount":1000}]'
    );
  });

  it('Last name missing - should create a json string version of payslip', function(){

    const array1 = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'David', , '70500', '9%', '10 March – 31 March' ]
    ];

    calculator1(array1).should.equal(
      '[{"name":"David undefined","pay-period":"Error in input","gross-income":5875,"income-tax":1205,"net-income":4670,"super-amount":529}]'
    );
  });

  it('Annual Salary missing - should create a json string version of payslip', function(){

    const array2 = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'Ryan', 'Chen', , '10%', '01 January – 31 January' ]
   ];

    calculator1(array2).should.equal(
      '[{"name":"Ryan Chen","pay-period":"01 January – 31 January","gross-income":"Error in input","income-tax":"Error in input","net-income":"Error in input","super-amount":"Error in input"}]'
    );
  });

  it('Invalid Annual Salary - should create a json string version of payslip', function(){

    const array3 = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'Ryan','Chen', '-120000', '10%', '01 April – 30 April' ]
      ];

    calculator1(array3).should.equal(
      '[{"name":"Ryan Chen","pay-period":"01 April – 30 April","gross-income":"Error in input","income-tax":"Error in input","net-income":"Error in input","super-amount":"Error in input"}]'
    );
  });

  it('Invalid Pay Periods - should create a json string version of payslip', function(){

    const array4 = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'David', 'Rudd', '85000', '9.5%', '01 February – 31 March' ]
    ];

    calculator1(array4).should.equal(
      '[{"name":"David Rudd","pay-period":"Error in input","gross-income":7083,"income-tax":1598,"net-income":5485,"super-amount":673}]'
    );
  });

  it('Invalid Super Rate - should create a json string version of payslip', function(){

    const array5 = [
      ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
      [ 'David', 'Rudd', '85000', '15%', '01 February – 28 February' ]
    ];

    calculator1(array5).should.equal(
      '[{"name":"David Rudd","pay-period":"01 February – 28 February","gross-income":7083,"income-tax":1598,"net-income":5485,"super-amount":"Error in input"}]'
    );
  });

});

