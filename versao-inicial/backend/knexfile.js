// Update with your config settings.
const { db } = require('./.env')

module.exports = {
  //'postgres://teste:teste@localhost/knowledge',//

  /**
   * CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';
   * GRANT ALL PRIVILEGES ON DATABASE "<data_base_name>" TO <user_name;
   * 
   * 
   */

  client: 'postgresql',
  connection: db,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};

