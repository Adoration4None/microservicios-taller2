const User = require('../database/User')

const getAllUsers = () => {
    return User.getAllUsers()
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
    getUser,
    registerUser,
    updateUser,
    deleteUser
}