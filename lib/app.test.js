require('dotenv').config();

const Movie = require('./models/Movies');

const  request  = require('supertest');
const app = require('./app');
const fs = require('fs');
const pool = require('../lib/utils/pool');

 
describe('app test', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });

  afterAll(() => {
    return pool.end();

  });

  it('test criteria', async() => {
    const response = await request(app)
      .post('/api/v1/movies')
      .send({
        title: 'jack and the beanstalk',
        genre: 'adventure/fantasy',
        description: 'Young boy finds adventure in a giant beanstalk'
      
      });
      // console.log(response.body);
    expect(response.body).toEqual({
      id: '1',
      title: 'jack and the beanstalk',
      genre: 'adventure/fantasy',
      description: 'Young boy finds adventure in a giant beanstalk'
    });
  });

  it('finds a movie by id via GET', async() => {
    const movie = await Movie.insert({ title: 'jack and the beanstalk', genre: 'adventure/fantasy', description: 'Young boy finds adventure in a giant beanstalk' });

    const response = await request(app)
      .get(`/api/v1/movies/${movie.id}`);

    expect(response.body).toEqual(movie);
  });

  it('updates a movie by id via PUT', async() => {
    const movie = await Movie.insert({ title: 'Peter Pan', genre: 'adventure/fantasy', description: 'Young boy finds adventure in a giant beanstalk' });

    const response = await request(app)
      .put(`/api/v1/movies/${movie.id}`)
      .send({ title: 'jack and the beanstalk', genre: 'adventure/fantasy', description: 'Young boy finds adventure in a giant beanstalk'
      });
    expect(response.body).toEqual({
      ...movie,
   
      title:'jack and the beanstalk', genre: 'adventure/fantasy', description: 'Young boy finds adventure in a giant beanstalk'
    });


  });


  
});
