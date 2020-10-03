const { Pool } = require('pg')
const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'api_project1',
    password: '2588',
    port: 5432
})

module.exports = pool