const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

//test if the dummy test table returns anything
function testDbConnection() {
  return pool.query(`SELECT * FROM TESTS`);
}

export default {
  testDbConnection,
};
