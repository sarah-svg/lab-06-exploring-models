require('dotenv').config();
const express = require('express');
const app = express();
const Movie = require('./models/Movies');

app.use(express.json());

//////CRUD post route
app.post('/api/v1/movies', (req, res) => {
  console.log('hi');
  Movie
    .insert(req.body)
    .then(movie => res.send(movie));
});
app.get('/api/v1/movies/:id', (req, res) => {
    console.log('hi2');
  Movie
    .findById(req.params.id)
    .then(movie => res.send(movie));
    console.log('hi3');
    
});


module.exports = app;


