const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'fullstackdev',
    port: 5432,
    host: 'localhost',
    database: 'perntodo'
})

module.exports = pool