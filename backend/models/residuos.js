const { DataTypes } = require('sequelize')
const sequelize = require('../db/connection')

const Residuo = sequelize.define('Residuo', {
    id_contribuciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_alumno: {
        type: DataTypes.STRING,
        // allowNull: true,
    },
    cantidad: { 
        type: DataTypes.INTEGER,
    },
    tipoResiduo: {
        type: DataTypes.INTEGER,
    },
    tamanoResiduo: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Residuo