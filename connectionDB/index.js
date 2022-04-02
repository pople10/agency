var DataBase_Connection = "postgres://admin:admin@localhost:5432/agency";
const pg = require("pg");
const client = new pg.Client(DataBase_Connection);
client.connect();
module.exports = client;