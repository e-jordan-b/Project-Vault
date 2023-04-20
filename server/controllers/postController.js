const Post = require('../models/postModel')

exports.createPost = async (req, res) => {
  console.log('imHere!!!')
  const tagsArr = req.body.tags.split(' ')
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      updates: req.body.updates,
      createdBy: req.body.creator,
      date: req.body.date,
      chat: [],
      tags: tagsArr,
      followers: []
    })
    await newPost.save()
    console.log('Posted')
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
