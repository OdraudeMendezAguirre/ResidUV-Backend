const { DataTypes } = require('sequelize')
const sequelize = require('../db/connection')

const Alumno = sequelize.define('Alumno', {
    id_alumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        // allowNull: true,
        validate: {
            isAlpha:{
                arg:true,
                msg:'Solo se permiten letras'
            }, 
        },
    },
    apellidoP: { 
        type: DataTypes.STRING,
        validate: {
            isAlpha:true, 
        },
    },
    apellidoM: {
        type: DataTypes.STRING,
        validate: {
            isAlpha:true, 
        },
    },
    matricula: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    region: {
        type: DataTypes.STRING,
       
    },
    facultad: {
        type: DataTypes.STRING,
       
    },
    programaEducativo: {
        type: DataTypes.STRING,
        validate: {
            isAlpha:true, 
        },
    },
    semestre: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: true
        },
    },
    preguntaID: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: true
        },
    },
    respuesta: {
        type: DataTypes.STRING,
    }
})

module.exports = Alumno