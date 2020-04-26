const Pool = require("pg").Pool;
const pool = new Pool({
  user: "momo",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

pool
  .query(`SELECT * FROM TESTS`)
  .then((res) => console.log("name", res.rows[0]));
