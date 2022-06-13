const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`, {
    logging: false
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '../Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../Models', file)));
  });

modelDefiners.forEach(model => model(sequelize));


const {User,Expenses,Earnings,Cointype,Category} = sequelize.models;

User.hasOne(Cointype);
Cointype.belongsTo(User);
User.hasMany(Expenses);
Expenses.belongsTo(User);
User.hasMany(Earnings);
Earnings.belongsTo(User);
Earnings.hasOne(Category);
Category.belongsTo(Earnings);
Expenses.hasOne(Category);
Category.belongsTo(Expenses);


module.exports = {
    ...sequelize.models,
    Connection: sequelize
}