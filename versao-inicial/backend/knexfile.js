// Update with your config settings.

module.exports = {

  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    database: 'knowledge',
    user: 'nervado',
    //password: '',
    //charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};

