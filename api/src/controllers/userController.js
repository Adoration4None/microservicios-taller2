const userService = require('../services/userService')

// // Metodo anterior
// const getAllUsers = (req, res) => {
//     const allUsers = userService.getAllUsers()
//         .then(allUsers => {
//             res.status(200).send({ status: 'OK', data: allUsers })
//         })
//         .catch(error => {
//             console.log('Error: ', error)
//             res.status(500).send({ status: 'Error', message: 'Error getting the users list' })
//         }) 
// }

const getAllUsers = (req, res) => {
    const page  = parseInt(req.query.page)  || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit

    const totalResults = userService.getTotalUsers().then(totalResults => {
        const totalPages = Math.ceil(totalResults / limit)

        const allUsers = userService.getAllUsers(limit, offset)
            .then(allUsers => {
                res.status(200).send({ 
                    status: 'OK',
                    data: allUsers,
                    page: page,
                    limit: limit,
                    total: totalResults,
                    totalPages: totalPages
                })
            })
            .catch(error => {
                console.log('Error: ', error)
                res.status(500).send({ status: 'Error', message: 'Error getting the users list' })
            }) 
        })

    
}


const getUser = (req, res) => {
    const user = userService.getUser(req.params.userId)
        .then(user => {
            if(user == null) {
                res.status(404).send({ status: 'Not Found' })
                return
            }
            res.status(200).send({ status: 'OK', data: user })
        })
        .catch(error => {
            console.log('Error: ', error)
            res.status(500).send({ status: 'Error', message: 'Error getting the user' })
        }) 
}


const registerUser = (req, res) => {
    const { body } = req

    if(!body.name || !body.dni || !body.email || !body.password) {
        res.status(400).send({ status: 'Error', message: 'Missing required fields' })
        return
    }

    const newUser = {
        name:     body.name,
        dni:      body.dni,
        email:    body.email,
        password: body.password
    }

    const registeredUser = userService.registerUser(newUser)
        .then(registeredUser => {
            if(registeredUser == null)
                res.status(500).send({ status: 'Error', message: 'Error registering the new user' })
            else res.status(201).send({ status: 'OK' })
        })
        .catch(error => {
            console.log('Error: ', error)
            res.status(500).send({ status: 'Error', message: 'Error registering the new user' })
        }) 
}


const login = (req, res) =>{
    const { body } = req

    if(!body.email || !body.password) {
        res.status(400).send({ status: 'Error', message: 'Missing required fields' })
        return
    }

    const loginData = {
        email:    body.email,
        password: body.password
    }

    const loggedUser = userService.login(loginData)
        .then(loggedUser => {
            if(loggedUser == null)
                res.status(404).send({ status: 'Error', message: 'User not found: Wrong login data' })
            else res.status(200).send({ status: 'OK', data: loggedUser })
        })
        .catch(error => {
            console.log('Error: ', error)
            res.status(500).send({ status: 'Error', message: 'Error logging in' })
        }) 
}


const updateUser = (req, res) => {
    const {
        body,
        params: { userId }
    } = req

    if(!userId) {
        res.status(400).send({ status: 'Error', message: 'Missing user ID' })
        return
    }

    const newUser = {
        name:     body.name,
        dni:      body.dni,
        email:    body.email,
        password: body.password
    }
        
    const updatedUser = userService.updateUser(userId, newUser)
        .then(updatedUser => {
            if(updatedUser == null) {
                res.status(500).send({ status: 'Error', message: 'Error updating the user' })
                return
            }
            else res.status(200).send({ status: 'OK' })
        })
        .catch(error => {
            console.log('Error: ', error)
            res.status(500).send({ status: 'Error', message: 'Error updating the user' })
        }) 
}


const deleteUser = (req, res) => {
    const deleted = userService.deleteUser(req.params.userId)
        .then(deleted => {
            if(deleted)
                res.status(200).send({ status: 'OK' })
            else {
                res.status(500).send({ status: 'Error', message: 'Error deleting the user' })
                return
            }
        })
        .catch(error => {
            console.log('Error: ', error)
            res.status(500).send({ status: 'Error', message: 'Error deleting the user' })
        }) 
}


module.exports = {
    getAllUsers,
    getUser,
    registerUser,
    login,
    updateUser,
    deleteUser
}