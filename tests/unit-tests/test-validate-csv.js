const chai = require('chai');
const should = require('chai').should();
const { validateCsv1 } = require('../../code/validate-csv.js');

describe('validateCsv1', function() {
    
    it('should return 0 if array has expected values', function() {
        const array = ['David', 'Rudd', '60050', '9%', '01 March - 31 March' ];
        const pos = 3;
        const result = validateCsv1(array, pos)
        result.should.equal(0);
    })
    
    it('should return 1 if name missing', function() {
        const array = ['David', '', '60050', '9%', '01 March - 31 March' ];
        const pos = 1;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if name has special character', function() {
        const array = ['David', '@Rudd', '60050', '9%', '01 March - 31 March' ];
        const pos = 1;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if salary is missing ', function() {
        const array = ['David', 'Rudd', '', '9%', '01 March - 31 March' ];
        const pos = 2;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if salary is negative ', function() {
        const array = ['David', 'Rudd', '-60050', '9%', '01 March - 31 March' ];
        const pos = 2;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if super rate is negative ', function() {
        const array = ['David', 'Rudd', '60050', '-9%', '01 March - 31 March' ];
        const pos = 3;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if super rate has character', function() {
        const array = ['David', 'Rudd', '60050', '9a%', '01 March - 31 March' ];
        const pos = 3;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if super rate has special character', function() {
        const array = ['David', 'Rudd', '60050', '9@%', '01 March - 31 March' ];
        const pos = 3;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if super rate is missing % symbol ', function() {
        const array = ['David', 'Rudd', '60050', '9', '01 March - 31 March' ];
        const pos = 3;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if pay period covers more than 1 calender month ', function() {
        const array = ['David', 'Rudd', '60050', '9%', '01 March - 30 April' ];
        const pos = 4;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if pay period covers less than 1 calender month', function() {
        const array = ['David', 'Rudd', '60050', '9%', '01 March - 20 March' ];
        const pos = 4;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })

    it('should return 1 if pay period dates in reverse order', function() {
        const array = ['David', 'Rudd', '60050', '9%', '31 March - 01 March' ];
        const pos = 4;
        let result = validateCsv1(array, pos);
        result.should.equal(1);
    })
});