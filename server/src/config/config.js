const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve('','.env.'+ process.env.NODE_ENV)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT || 3001,
    DB_USER : process.env.DB_USER,
    DB_NAME : process.env.DB_NAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_PORT : process.env.DB_PORT,
}