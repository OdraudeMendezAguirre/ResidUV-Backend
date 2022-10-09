const express = require('express')
const cors = require('cors')
const sequelize  = require('../db/connection')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.loginPath = '/auth'
        this.residuosPath = '/api'

        // Rutas de mi aplicación
        this.dbConnection()
        this.middlewares()
        this.routes(); 
    }
 
    async dbConnection() { 

        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.');
        } catch (error) {
           throw new Error(error)
        }
    }
    middlewares() {
        //CORS
        this.app.use(cors())

        //lectura del body
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.loginPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/users'))
        this.app.use(this.residuosPath, require('../routes/residuos'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;