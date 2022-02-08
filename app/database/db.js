const { Sequelize } = require('sequelize');
const config = require('config');
const mysql = require('mysql2');

const { dialect, host, port, dbName, dbUser, dbPassword } = config.get("DatabaseProduction").dbConfig;

const initializeDb = async () => {
    const mysqlConnection = mysql.createConnection({
        host: host,
        user: dbUser,
        password: dbPassword
    });

    mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`,(error, result) => {
    
        if (error) {
            throw new Error(error)
        }
        else{
            console.log(`${dbName} created successfully`);
        }
    })
}

const main = async () => await initializeDb();

main();

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: host,
    dialect: dialect,
    port: port,
});

module.exports = sequelize;