const jwt = require('jsonwebtoken')

const secret = process.env.SECRET || 'hlu60kkasdn32jiofh0c31z64m3z1wkp7vf';

const generateAccessToken = (id, name, dni) => {
    return jwt.sign({
        id: id,
        name: name,
        dni: dni,
    }, secret, {expiresIn: '1m'})
}

module.exports = {
    generateAccessToken
}