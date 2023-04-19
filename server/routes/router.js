const express = require('express')
const router = express.Router()
const { getUser, postUser } = require('../controllers/controller')

router.post('/login', getUser)

router.post('/register', postUser)

module.exports = router
