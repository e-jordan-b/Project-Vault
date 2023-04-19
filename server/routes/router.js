const express = require('express')
const router = express.Router()
const { getUser, postUser } = require('../controllers/controller')

router.get('/login', getUser)

router.post('/register', postUser)

module.exports = router
