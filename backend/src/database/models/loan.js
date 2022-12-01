const { DataTypes } = require("sequelize")

const loan = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'books',
          key: 'code',
        }
    }
}

module.exports = loan