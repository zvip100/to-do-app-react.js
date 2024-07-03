import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp({
  host: "ep-white-field-a6m3jd5i.us-west-2.retooldb.com",
  port: 5432,
  database: "retool",
  user: "retool",
  password: process.env.DB_PSWD,
  ssl: true,
});

export default db;
