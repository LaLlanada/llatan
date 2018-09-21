const connection = require('../config/database');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

// Modelos Utilizados
const Usuario = require('../models/user');
const Guia = require('../models/guia');

const controller = {};

// Medoto que actualiza los datos de un guia
controller.actualizarDatos = async function (data, callback) {
    try {
        const response = await Guia.update(
            {
                SobreNombre: data.sobreNombre,
                FechaNacimiento: data.fechaNacimiento,
                AnoIngreso: data.anoIngreso,
                Sexo: data.sexo,
                Rol: data.rol
            },
            { where: { id: data.id } }  // Se busca por ID
        );

        callback(null);
    } catch (err) {
        console.log('Se produjo un error en el controlador de guia: ',err);
        callback(err);
    }
}

// Metodo que retorna un arreglo de coordis y baquianos
controller.getCoordisyBaquianos = async function (callback) {
    try {
        let response = await Guia.findAll({ 
            where: 
                Sequelize.or({Rol: 'Coordi'}, {Rol: 'Baquiano'})
        });

        // Construye un arreglo unicamente con los datos necesarios
        let guias = response.map(resultado => resultado.dataValues);

        // Agrega los datos basicos del guia
        for (let i = 0; i < guias.length; i++) {
            let response = await Usuario.findOne({
                where: {
                    id: guias[i].id
                }
            });

            if (response) {
                guias[i].Nombre = response.dataValues.Nombre;
                guias[i].Snombre = response.dataValues.Snombre;
                guias[i].Apellido = response.dataValues.Apellido;
                guias[i].Cedula = response.dataValues.Cedula;
                guias[i].Email = response.dataValues.Email;
                guias[i].Username = response.dataValues.Username;
            }
        }

        guias = guias.filter(guia => guia.Rol);

        // Retorna el arreglo
        callback({guias}, null);
    } catch (err) {
        callback(null, err);
    }
};

module.exports = controller;