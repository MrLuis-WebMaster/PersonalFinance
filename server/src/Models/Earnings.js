const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Earnings', {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey: true
    },
    amount: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    date: {
        type:DataTypes.STRING
    }
  });
};