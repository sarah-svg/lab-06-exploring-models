require('dotenv').config();
const express = require('express');
const app = express();
const Movie = require('./models/Movies');

app.use(express.json());

//////CRUD post route
app.post('/api/v1/movies', (req, res) => {
  Movie
    .insert(req.body)
    .then(movie => res.send(movie));
});


module.exports = app;


