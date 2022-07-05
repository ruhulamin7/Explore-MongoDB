// dependencies
const express = require('express');
const { ObjectId } = require('mongodb');
const postRouter = express.Router();
const { client } = require('../db');

const db = client.db('myDB');
const users = db.collection('users');

// insert a single post into the database
postRouter.post('/single', async (req, res, next) => {
  try {
    const post = await req.body;
    const result = await users.insertOne(post);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// insert a multiple post into the database
postRouter.post('/multiple', async (req, res, next) => {
  try {
    const post = await req.body;
    const result = await users.insertMany(post);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get all multiple post
postRouter.get('/get-all', async (req, res, next) => {
  console.log('get-all');
  try {
    const result = await users.find({}).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get a single post
postRouter.get('/get-single/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const _id = ObjectId(req.params.id);
    const result = await users.findOne(_id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// update a single post
postRouter.put('/:id', async (req, res, next) => {
  try {
    const _id = ObjectId(req.params.id);
    const result = await users.updateOne(
      { _id },
      { $set: req.body },
      { upsert: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update a single post and return
postRouter.put('/:id/return', async (req, res, next) => {
  try {
    const _id = ObjectId(req.params.id);
    const result = await users.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { upsert: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = postRouter;
