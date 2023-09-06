import { createPool } from 'mysql2/promise'
import express from 'express'

const host       = process.env.HOST        || '0.0.0.0'
const db         = process.env.DB_NAME     || 'users'
const dbUser     = process.env.DB_USER     || 'root'
const dbPassword = process.env.DB_PASSWORD || '123456'
const dbPort     = process.env.DB_PORT     || '3306'

const app = express()

const pool = createPool({
    host: host, 
    port: dbPort,
    database: db,
    user: dbUser,
    password: dbPassword
})

app.get('/', (req, res) => {
    res.send('Welcome to the Users Authentication API')
})

app.get('/users', async (req, res) => {
    const query = 'SELECT name,dni,email FROM users'
    const result = await pool.query(query)
    res.json(result[0])
})


app.listen(3000)
console.log('Listening on port 3000 ...')

