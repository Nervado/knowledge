const config = require('../knexfile.js')
const knex = require('knex')(config)

// Executando migrations dentro do arquivo
knex.migrate.latest([config])

/**
 * Pode nao ser boa pratica
 * evoluir o banco com controle
 * 
 * 
 */

// Exportando o knex
module.exports = knex


/* 
Comandos usandos como knex

Cria arquivo knex.js
knex init 

Cria table no banco configurado
knex migrate:make create_table_users


*/