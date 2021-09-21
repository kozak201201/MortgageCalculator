const {Bank} = require('../models/models');
const BankValidator = require('../models/bankValidator');


class CalculatorController {
    async calculate(req, res) {
        try {
            const {initialLoan, downPayment, bankId} = req.query;
            const bank = await Bank.findByPk(bankId);
            
            if (!bank) {
                return res.status(400).json({error: `Bank with id: ${bankId} didn't exist`});
            }
            
            const bankValidator = new BankValidator();
            bankValidator.checkMaxLoan(+initialLoan);
            
            const downPaymentPercent = findDownPaymentPercent(+initialLoan, downPayment);
            bankValidator.checkMinDownPayment(downPaymentPercent);

            if (bankValidator.errors.length != 0) {
                return res.status(400).json({errors: bankValidator.errors});
            }

            const amountBorrow = initialLoan - downPayment;
            const monthlyLoanRate = bank.interestRate / 12;
            const result = Math.ceil((amountBorrow * monthlyLoanRate) / (1 - monthlyLoanRate * (1 - bank.loanTermMonth)));

            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
}

function findDownPaymentPercent(maxLoan, downPayment) {
    let result = (downPayment / maxLoan) * 100;
    return result;
}

module.exports = new CalculatorController();