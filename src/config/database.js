const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "17Ahrenboy",
    host: "localhost",
    port: 5432,
    database: "database_demo"
})

module.exports = pool;