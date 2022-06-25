const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Expense', {
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
    },
    concept: {
        type:DataTypes.STRING
    },
    type: {
        type:DataTypes.STRING
    },
    category: {
        type:DataTypes.STRING
    }
  });
};