const {Bank} = require('../models/models');
const BankValidator = require('../models/bankValidator');

class BankController {
    async create(req, res, next) {
        try {
            const validator = new BankValidator();
    
            const {
                name, 
                interestRate, 
                maxLoan, 
                minDownPayment, 
                loanTermMonth
            } = req.body;
    
            await validator.checkIsUniqueName(name);
            validator.checkInterestRate(interestRate);
            validator.checkMaxLoan(maxLoan);
            validator.checkMinDownPayment(minDownPayment);
            validator.checkLoanTermMonth(loanTermMonth);
    
            if (validator.errors.length != 0) {
                return res.status(400).json({errors: validator.errors});
            }
    
            await Bank.create({
                name, 
                interestRate, 
                maxLoan, 
                minDownPayment, 
                loanTermMonth, 
                userId: req.user.id
            });

            res.sendStatus(200);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const bank = await Bank.findByPk(id);

            if (!bank) {
                return res.status(400).json({error: `Bank with id:${id} didn't exist`});
            }
            
            const {
                name, 
                interestRate, 
                maxLoan, 
                minDownPayment, 
                loanTermMonth
            } = req.body;
            
            const reqObj = {};
            const validator = new BankValidator();

            await addNameIfExistAndValid(name, reqObj, validator);
            addInterestRateIfExistAndValid(interestRate, reqObj, validator);
            addMaxLoanIfExistAndValid(maxLoan, reqObj, validator);
            addMinDownPaymentIfExistAndValid(minDownPayment, loanTermMonth, validator);
            addLoanTermMonthIfExistAndValid(loanTermMonth, reqObj, validator);

            if (validator.errors.length != 0) {
                return res.status(400).json({errors: validator.errors});
            }

            await Bank.update({...reqObj}, {where: {id}});
            res.sendStatus(200);            
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            const result = await Bank.destroy({where: {id}});

            if (!result) {
                return res.status(400).json({error: `Can't delete bank with id: ${id}`});
            }
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

}
async function addNameIfExistAndValid(name, reqObj, validator) {
    if (name) {
        const isUniqueName = await validator.checkIsUniqueName(name);

        if (isUniqueName) {
            reqObj.name = name;
        }
    }
}

function addInterestRateIfExistAndValid(interestRate, reqObj, validator) {
    if (interestRate) {
        const isInterestRate = validator.checkInterestRate(interestRate);

        if (isInterestRate) {
            return reqObj.interestRate = interestRate;
        }
    }
}

function addMaxLoanIfExistAndValid(maxLoan, reqObj, validator) {
    if (maxLoan) {
        const isMaxLoan = validator.checkMaxLoan(maxLoan);

        if (isMaxLoan) {
            reqObj.maxLoan = maxLoan;
        }
    }
}

function addMinDownPaymentIfExistAndValid(minDownPayment, reqObj, validator) {
    if (minDownPayment) {
        const isMinDownPayment = validator.checkMinDownPayment(minDownPayment);

        if (isMinDownPayment) {
            reqObj.minDownPayment = minDownPayment;
        }
    }
}

function addLoanTermMonthIfExistAndValid(loanTermMonth, reqObj, validator) {
    if (loanTermMonth) {
        const isLoanTermMonth = validator.checkLoanTermMonth(loanTermMonth);

        if (isLoanTermMonth) {
            reqObj.loanTermMonth = loanTermMonth;
        }
    }
}

module.exports = new BankController();