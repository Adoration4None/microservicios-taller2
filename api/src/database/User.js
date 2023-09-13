const mysql2 = require('mysql2/promise')

const host       = process.env.HOST        || '172.17.0.2'
const db         = process.env.DB_NAME     || 'users'
const dbUser     = process.env.DB_USER     || 'root'
const dbPassword = process.env.DB_PASSWORD || '123456'
const dbPort     = process.env.DB_PORT     || '3306'

const pool = mysql2.createPool({
    host: host, 
    port: dbPort,
    database: db,
    user: dbUser,
    password: dbPassword
})

const getAllUsers = async (limit, offset) => {
    const query = `SELECT id,name,dni,email FROM users LIMIT ${limit} OFFSET ${offset}`
    const result = await pool.query(query)
    return result[0]
}

const getTotalUsers = async () => {
    const query = `SELECT COUNT(id) as total FROM users`
    const result = await pool.query(query)

    return parseInt(result[0][0].total)
}


const getUser = async (idUser) => {
    const query = `SELECT name,dni,email FROM users WHERE id=${idUser}`
    const result = await pool.query(query)

    return result[0].length > 0 ? result[0] : null
}

const registerUser = async (newUser) => {
    if( await emailExists(newUser.email) || await dniExists(newUser.dni) ) {
        return null
    }

    const query = `INSERT INTO users (name, dni, email, password) 
    VALUES ('${newUser.name}', '${newUser.dni}', '${newUser.email}', '${newUser.password}');`

    try {
        const result = await pool.query(query)
        return result[0]
    } catch (error) {
        console.error('Error inserting user in database: ', error)
        throw error
    }
}

async function emailExists(email) {
    const query = `SELECT id,name FROM users WHERE email='${email}'`
    const result = await pool.query(query)

    return result[0].length > 0
}

async function dniExists(dni) {
    const query = `SELECT id,name FROM users WHERE dni='${dni}'`
    const result = await pool.query(query)

    return result[0].length > 0
}

const updateUser = async (idUser, newUser) => {
    if( getUser(idUser) == null ) {
        return null
    }

    const query = `UPDATE users
    SET name = '${newUser.name}', 
    dni = '${newUser.dni}',  
    email = '${newUser.email}', 
    password = '${newUser.password}'
    WHERE id=${idUser};`

    try {
        const result = await pool.query(query)
        return result[0]
    } catch (error) {
        console.error('Error updating user in database: ', error)
        throw error
    }
}

const deleteUser = async (idUser) => {
    if( getUser(idUser) == null ) {
        return false
    }

    try {
        const query = `DELETE FROM users WHERE id=${idUser}`
        const result = await pool.query(query)
        return true
    } catch (error) {
        console.error('Error deleting user in database: ', error)
        throw error
    }
}

module.exports = {
    getAllUsers,
    getTotalUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser
}



