class MortgageCalculator {
    calculate(initialLoan, downPayment, bank) {
        const amountBorrow = initialLoan - downPayment;
        const monthlyLoanRate = bank.interestRate / 12;
        const result = Math.ceil((amountBorrow * monthlyLoanRate) / (1 - monthlyLoanRate * (1 - bank.loanTermMonth)));
        return result
    }

    findDownPaymentPercent(initialLoan, downPayment) {
        const result = (downPayment / initialLoan) * 100;
        return result;
    }
}

module.exports = new MortgageCalculator();