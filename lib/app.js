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
app.get('/api/v1/movies/:id', (req, res) => {

  Movie
    .findById(req.params.id)
    .then(movie => res.send(movie));

    
});
app.put('/api/v1/movies/:id', (req, res) => {
  Movie
    .update(req.params.id, req.body)
    .then(movie => res.send(movie));

});


app.delete('/api/v1/movies/:id', (req, res) => {

  Movie
    .delete(req.params.id)
    .then(movie => res.send(movie));

      
});
module.exports = app;


