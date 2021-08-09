const { Pool } = require('pg');

const PG_URI =
  'postgres://rugivdrl:C715_7t6dXMs7DU7ll_5XmyLHKo6UUG-@otto.db.elephantsql.com/rugivdrl';
const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
