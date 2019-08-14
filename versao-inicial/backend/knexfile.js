// Update with your config settings.

module.exports = {
  //'postgres://teste:teste@localhost/knowledge',//

  /**
   * CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';
   * GRANT ALL PRIVILEGES ON DATABASE "<data_base_name>" TO <user_name>;
   * 
   */

  client: 'postgresql',
  connection: {

    host: '127.0.0.1',
    port: 5432,
    database: 'knowledge',
    user: 'teste',
    password: 'teste',
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};

