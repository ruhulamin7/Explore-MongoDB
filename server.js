// dependencies
const express = require('express');
const { client, connectDB } = require('./db');
const postRouter = require('./routes/postRoute');

// initialize express
const app = express();

// middleware
app.use(express.json());
app.use('/posts', postRouter);

// server initialize

// server listener
app.listen(8000, (err, req, res) => {
  console.log('Server listening on port 8000');
  connectDB().catch((err) => console.log(err.message));
});
