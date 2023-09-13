const express = require('express')

const router  = express.Router()

router.route('/').get((req, res) => {
    res.send('<h1>Welcome to the Users Authentication API</h1>\
              <p1>API version 1</p>\
              <p1>Samuel Echeverri Blandón</p>')
})

module.exports = router