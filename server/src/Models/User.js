const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  
        allowNull: false,                
        primaryKey: true
    },
    fullName : {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    totalBalance: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    country : {
      type: DataTypes.STRING,
      allowNull:false
    },
    currency : {
      type: DataTypes.STRING,
      allowNull:false
    }
  });
};