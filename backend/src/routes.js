const express = require('express')

const routes = express.Router()

const ONGcontroller = require('./controllers/ONGcontroller')
const INCIDENTcontroller = require('./controllers/INCIDENTcontroller')
const PROFILEcontroller = require('./controllers/PROFILEcontroller')
const SESSIONcontroller = require('./controllers/SESSIONcontroller')

const connect = require('./database/connection')

//Sessão de login
routes.post('/sessions', SESSIONcontroller.create)

//ONGs
routes.get('/ongs', ONGcontroller.index)
routes.post('/ongs', ONGcontroller.create)

//Incidents - Casos
routes.get('/incidents', INCIDENTcontroller.index)
routes.post('/incidents', INCIDENTcontroller.create)
routes.delete('/incidents/:id', INCIDENTcontroller.delete)

//Listar incident expecífico
routes.get('/incidents/:id', PROFILEcontroller.index)

module.exports = routes