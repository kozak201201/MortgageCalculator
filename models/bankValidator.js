const {Bank} = require('./models');

const MAX_LOAN=10_000_000;
const MAX_DOWN_PAYMENT=50;
const MIN_DOWN_PAYMENT=10;
const MIN_LOAD_TERM_MONTH=12;
const MIN_INTEREST_RATE=0;
const MAX_INTEREST_RATE=10;

class BankValidator {
    constructor() {
        this.errors = [];
    }

    async checkIsUniqueName(name) {
        const result = await Bank.findOne({where: {name}});

        if (result) {
            this.errors.push('not unique name');
            return false;
        }

        return true;
    }

    checkInterestRate(interestRate) {
        if (isNaN(interestRate)) {
            this.errors.push('Interest rate not number');
            return false;
        }

        if (interestRate < MIN_INTEREST_RATE || interestRate > MAX_INTEREST_RATE) {
            this.errors.push('Invalid interest rate size');
            return false;
        }

        return true;
    }

    checkMaxLoan(maxLoan) {
        if (isNaN(maxLoan)) {
            this.errors.push('Maximum loan not number');
            return false;
        }
        
        if (maxLoan > MAX_LOAN) {
            this.errors.push('Invalid maximum loan size');
            return false;
        }

        return true;
    }

    checkMinDownPayment(minDownPayment) {
        if (isNaN(minDownPayment)) {
            this.errors.push('Minimum down not number');
            return false;
        }

        if (minDownPayment < MIN_DOWN_PAYMENT || minDownPayment > MAX_DOWN_PAYMENT) {
            this.errors.push('Invalid minimum down payment size');
            return false;
        }

        return true;
    }

    checkLoanTermMonth(loanTermMonth) {
        if (isNaN(loanTermMonth)) {
            this.errors.push('Loan term month not number');
            return false;
        }

        if (loanTermMonth < MIN_LOAD_TERM_MONTH) {
            this.errors.push('Invalid loan term month size');
            return false;
        }

        return true;
    }
}

module.exports = BankValidator;