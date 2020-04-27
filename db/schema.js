const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

async function populateGenre(genreArr) {
  await pool.query(`DROP TABLE IF EXISTS genre CASCADE`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS genre (
      genre_id integer PRIMARY KEY,
      name VARCHAR (255)
      )`
  );
  const idArr = [];
  const nameArr = [];
  genreArr.forEach((genre) => {
    idArr.push(genre.id);
    nameArr.push(genre.name);
  });
  return pool.query(
    `INSERT INTO genre (genre_id, name)
      SELECT * FROM UNNEST ($1::int[], $2::VARCHAR(255)[])`,
    [[...idArr], [...nameArr]]
  );
}

async function populateTopMovie(movieArr) {
  await pool.query(`DROP TABLE IF EXISTS top_movie CASCADE`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS top_movie (
      movie_id integer PRIMARY KEY,
      title VARCHAR(255),
      popularity decimal,
      adult bool,
      image_path VARCHAR(255)[]
    )`
  );

  return pool.query(
    `INSERT INTO top_movie (movie_id, title, popularity, adult, image_path)
      SELECT movie_id, title, popularity, adult, image_path 
      FROM jsonb_to_recordset($1::jsonb) AS t (
        movie_id integer,
        title VARCHAR(255),
        popularity decimal,
        adult bool,
        image_path VARCHAR(255)[])`,
    [JSON.stringify(movieArr)]
  );
}

export default {
  populateGenre,
  populateTopMovie,
};
