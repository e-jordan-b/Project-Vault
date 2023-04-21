const express = require('express')
const router = express.Router()
const { getUser, postUser } = require('../controllers/controller')
const { createPost, getPosts, getPostsById, followProject, updateProject, followingProjects, personalProjects } = require('../controllers/postController')
const { checkout } = require('../controllers/payment')
// Login Routes
router.post('/login', getUser)
router.post('/register', postUser)

// Post Routes
router.post('/create', createPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPostsById)
router.post('/posts/follow', followProject)
router.get('/posts/following/:id', followingProjects)
router.get('/posts/personal/:id', personalProjects)
// Payment Route
router.post('/api/checkout', checkout)

// Update Routes
router.post('/update/:id', updateProject)
module.exports = router
