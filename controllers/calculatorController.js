const {Bank} = require('../models/models');
const BankValidator = require('../models/bankValidator');
const mortgageCalculator = require('../models/mortgageCalculator');

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
            
            const downPaymentPercent = mortgageCalculator.findDownPaymentPercent(+initialLoan, downPayment);
            bankValidator.checkMinDownPayment(downPaymentPercent);

            if (bankValidator.errors.length != 0) {
                return res.status(400).json({errors: bankValidator.errors});
            }

            const result = mortgageCalculator.calculate(initialLoan, downPayment, bank);

            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = new CalculatorController();