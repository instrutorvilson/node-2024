/*const pg = require('pg')
const pool = 
new pg.Pool(
    {connectionString: 'postgres://postgres:admin@localhost:5432/postgres'})

module.exports = pool*/

const { Pool } = require('pg')
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})

module.exports = pool