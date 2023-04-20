const express = require('express')
const router = express.Router()
const { getUser, postUser } = require('../controllers/controller')
const { createPost, getPosts } = require('../controllers/postController')

// Login Routes
router.post('/login', getUser)
router.post('/register', postUser)
// Post Routes
router.post('/create', createPost)
router.get('/posts', getPosts)
module.exports = router
