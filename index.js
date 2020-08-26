const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const api_route = require('./routes/api');
const book_route = require('./routes/books')
const auth_route = require('./routes/auth');
const db = require('./services/db');

const app = express();

// middlewares
app.use(bodyParser.json());

//index route
 app.get('/', (req, res) => {
    res.send({
        response: 200,
        message:'Welcome to my bookstore'
    });
  });

  app.use('/api', api_route);
  app.use('/book', book_route);
  app.use('/auth', auth_route);

  // Listen on port 3000
const server = app.listen(process.env.PORT || 3000, () => { console.log("Listening on port 3000")});



