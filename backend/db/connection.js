const  { Sequelize }  = require('sequelize');

const sequelize = new Sequelize('resid-uv', 'root', 'admin', {
    host:'localhost',
    port: 3307,
    dialect: 'mysql'
});

module.exports = sequelize