const {
  Pool
} = require('pg')

const {
  db_con_string
} = require('../config/db');

const pool = new Pool({
  connectionString: db_con_string
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}