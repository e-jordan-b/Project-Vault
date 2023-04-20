const Post = require('../models/postModel')

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      updates: req.body.updates,
      createdBy: req.body.user,
      date: req.body.date,
      chat: [],
      tags: [...req.body.tags],
      followers: []
    })
    await newPost.save()
    console.log('Posted')
    res.status(201).send({ newPost })
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create post' })
  }
}
