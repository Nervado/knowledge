const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

// adicionando a configuracao do DB
app.db = db

// add mongoose ao app
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./scheduler')
    .then('./config/routes.js')
    .into(app)

app.listen(3006, () => {
    console.log('Backend executing...')
})