// Update with your config settings.
const dotenv = require('dotenv').config();
const env = require ('env')
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database:process.env.DB_MYSQL,
      user: process.env.DB_USER ,
      password:process.env.DB_PASS,
      host:process.env.DB_HOST
      // port:process.env.APP_PORT
    },
    pool: {
      min: 10,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
