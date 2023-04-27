import express, { Express, Request, Response } from 'express';
import Project from '../models/projectModel';
import User from '../models/userModel';

exports.createProject = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const tagsArr = req.body.tags.split(' ');
  try {
    const newProject = new Project({
      // id: req.body.id,
      title: req.body.title,
      description: req.body.quillValue,
      image: req.body.image,
      updates: req.body.updates,
      author: req.body.author,
      createdBy: req.body.user,
      date: req.body.date,
      chat: [],
      tags: tagsArr,
      followers: [],
    });
    const newCreatedProject = await newProject.save();
    console.log('Project posted!');

    const user = await User.findByIdAndUpdate(req.body.user._id, {
      $push: { createdProjects: newCreatedProject },
    });
    // const user = await User.findById(req.body.user._id, { raw: true });
    // user?.createdPosts.push(newCreatedPost);
    // await user?.save();

    res.status(201).send({ newCreatedProject });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Could not create project' });
  }
};

exports.getProjects = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const project = await Project.find({});
    res.status(201).send({ projects });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot find projects' });
  }
};

exports.getProjectsById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const project = await Project.findOne({ _id: req.params._id });
    res.status(201).send({ project });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot find project' });
  }
};

exports.followProject = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const projectId = req.body.project._id;
  try {
    // const user = await User.findOne({ _id: req.body.user._id });
    // user.following.push(project);
    const user = await User.findByIdAndUpdate(req.body.user._id, {
      $push: { following: projectId },
    });

    // const post = await Post.findOne({ id: project });
    // post.followers.push(user._id);
    // await user.save();

    const post = await Project.findByIdAndUpdate(projectId, {
      $push: { followers: user?._id },
    });

    res.status(201).send({ user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot follow' });
  }
};

exports.updateProject = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const newUpdate = {
      // id: req.body._id,
      title: req.body.title,
      description: req.body.quillValue,
      date: req.body.date,
      image: req.body.image,
      video: req.body.video,
      chat: [],
    };

    const updatedProject = await Project.findByIdAndUpdate(req.params._id, {
      $push: { updates: newUpdate },
    });

    // const project = await Project.findOne(req.params.id, ;
    // project.updates.push(newUpdate);
    // await project.save();

    res.status(201).send({ newUpdate });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot update' });
  }
};

exports.followingProjects = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = await User.findById(req.params._id);
    const following = user?.following;
    const projects = await Project.find({ _id: { $in: following } });

    res.status(201).send({ projects });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot get following' });
  }
};

exports.personalProjects = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = await User.findById(req.params._id);
    const created = user?.createdPosts;
    const projects = await Project.find({ _id: { $in: created } });

    res.status(201).send({ projects });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot get your projects' });
  }
};

exports.postComment = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    // const project = await Project.findOne(req.body._id);
    const newComment = {
      createdBy: req.body.createdBy,
      comment: req.body.comment,
      date: req.body.date,
    };

    // project.chat.push(newComment);
    // project.save();

    const comment = await Project.findByIdAndUpdate(_id, {
      $push: { chat: newComment },
    });

    res.status(201).send({ comment });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'cannot post comment' });
  }
};
