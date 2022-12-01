
const { Sequelize } = require("sequelize")
const book  = require("./models/book")
const loan = require("./models/loan")
const user = require("./models/user")


const db = new Sequelize({
    dialect: process.env.DIALECT,
    username: process.env.USERDB,
    password: process.env.PASSWORD,
    port: +process.env.PORT,
    host: process.env.HOST,
    database: process.env.DATABASE
})

db.define('Book', book, { tableName: 'books' })
db.define('Loan', loan, { tableName: 'loans' })
db.define('User', user, { tableName: 'users' })


module.exports = db