const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Bank = db.define('bank', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    interestRate: {type: DataTypes.SMALLINT, allowNull: false},
    maxLoan: {type: DataTypes.INTEGER, allowNull: false},
    minDownPayment: {type: DataTypes.INTEGER, allowNull: false},
    loanTermMonth: {type: DataTypes.INTEGER, allowNull: false}
});

User.hasMany(Bank);

module.exports = {User, Bank};