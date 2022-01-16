const pgp = require("pg-promise")({});

const connectionString = "postgres://najmovi_admin:12345678@localhost:5432/najmovi_db";

const dbConnection = {
  connectionString,
  max: 1
};
pgp.pg.types.setTypeParser(1114,(s)=>s)
const db = pgp(dbConnection);

exports.db = db

