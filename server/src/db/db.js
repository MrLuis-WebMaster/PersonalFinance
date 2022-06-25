const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// require('dotenv').config();
// const {
//   DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
// } = process.env;

const config = require('../config/config');


const sequelize = new Sequelize(`postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.HOST}:${config.DB_PORT}/${config.DB_NAME}`, {
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


const {User,Expense,Earning,Cointype,Category} = sequelize.models;

User.hasOne(Cointype);
Cointype.belongsTo(User);
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Earning);
Earning.belongsTo(User);
Earning.hasOne(Category);
Category.belongsTo(Earning);
Expense.hasOne(Category);
Category.belongsTo(Expense);


module.exports = {
    ...sequelize.models,
    Connection: sequelize
}