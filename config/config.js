require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "poisedon4",
    "database": "final_project_2",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "port": process.env.PGPORT,
    "host": process.env.PGHOST,
    "dialect": "postgres"
  }
}
