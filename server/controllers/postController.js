const Post = require('../models/postModel')
const User = require('../models/userModel')

exports.createPost = async (req, res) => {
  const tagsArr = req.body.tags.split(' ')
  try {
    const newPost = new Post({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      updates: req.body.updates,
      author: req.body.author,
      createdBy: req.body.user,
      date: req.body.date,
      chat: [],
      tags: tagsArr,
      followers: []
    })
    await newPost.save()
    console.log('Posted')

    const user = await User.findById(req.body.user._id)
    user.createdPosts.push(newPost)
    await user.save()

    res.status(201).send({ newPost })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create post' })
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(201).send({ posts })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot find posts' })
  }
}

exports.getPostsById = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id })
    res.status(201).send({ post })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot find post' })
  }
}

exports.followProject = async (req, res) => {
  const project = req.body.project.id
  try {
    const user = await User.findOne({ _id: req.body.user._id })
    user.following.push(project)
    await user.save()
    res.status(201).send({ user })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot follow' })
  }
}

exports.updateProject = async (req, res) => {
  try {
    const project = await Post.findOne({ id: req.params.id })

    const newUpdate = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      image: req.body.image,
      chat: []
    }

    project.updates.push(newUpdate)

    await project.save()

    res.status(201).send({ newUpdate })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot update' })
  }
}

exports.followingProjects = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const following = user.following
    const projects = await Post.find({ id: { $in: following } })

    res.status(201).send({ projects })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot get following' })
  }
}

exports.personalProjects = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const created = user.createdPosts
    const projects = await Post.find({ _id: { $in: created } })

    res.status(201).send({ projects })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'cannot get your projects' })
  }
}
