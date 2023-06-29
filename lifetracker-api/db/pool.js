const { Pool } = require("pg"); //importing pg module/depedency

//SQL script as a string to create a table called users
const sqlScript = `
CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
`;

//DB information to connect
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "registration_login",
});

//Execute the SQL script
pool
  .query(sqlScript)
  .then(() => {
    console.log("Table create query successfully");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

//export the pool to be used in a different file
module.exports = pool;