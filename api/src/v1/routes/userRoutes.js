const express = require('express')
const userController = require('../../controllers/userController')

const router  = express.Router()

router
    .get('/', userController.getAllUsers)
    .get('/?page=:page&limit=:limit', userController.getAllUsers)
    .get('/:userId', userController.getUser)
    .post('/', userController.registerUser)
    .post('/login', userController.login)
    .patch('/:userId', userController.updateUser)
    .patch('/update-password', userController.updatePassword)
    .delete('/:userId', userController.deleteUser)

module.exports = router



    

