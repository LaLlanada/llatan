const Sequelize = require('sequelize');
const connection = require('../config/database');

// Modelo de Usuario
const User = connection.define('Usuario', 
{
    Nombre: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    Snombre: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Apellido: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    Cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,

        validate: {
            isInt: {
                msg: 'La cedula ingresada es inválida.'
            }
        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    Username: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    esAdministrador: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    SobreNombre: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    FechaNacimiento: {
        type: Sequelize.DATE,
        defaultValue: null,
        validate: {
            isDate: true,
            isAfter: '1900-01-01'
        }
    },
    AnoIngreso: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,

        validate: {
            min: 1994,
            notEmpty: true
        }
    },
    Sexo: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
            isAlpha: true,
            isIn: [['Masculino', 'Femenino', 'Otro']]
        }
    },
    Rol: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isAlphanumeric: true,
            notEmpty: true
        }
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = User;