const User = require('../database/User')

const getAllUsers = (limit, offset) => {
    return User.getAllUsers(limit, offset)
}

const getTotalUsers = () => {
    return User.getTotalUsers()
}

const getUser = (idUser) => {
    return User.getUser(idUser)
}

const registerUser = (newUser) => {
    return User.registerUser(newUser)
}

const updateUser = (idUser, newUser) => {
    return User.updateUser(idUser, newUser)
}

const deleteUser = (idUser) => {
    return User.deleteUser(idUser)
}

module.exports = {
    getAllUsers,
    getTotalUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser
}