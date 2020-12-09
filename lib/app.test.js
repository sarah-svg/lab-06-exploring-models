require('dotenv').config();


const  request  = require('supertest');
const app = require('./app');
const fs = require('fs');
const pool = require('../lib/utils/pool');

 
describe('app test', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sq', 'utf-8'));

  });

  afterAll(() => {
    return pool.end();

  });

  it('test criteria', async() => {
    const response = await request(app)
      .post('/api/vi/movies')
      .send({
        title: 'jack and the beanstalk',
        genre: 'adventure/fantasy',
        description: 'Young boy finds adventure in a giant beanstalk'
      
      });
      // console.log(response.body);
    expect(response.body).toEqual({
      id: '9',
      title: 'jack and the beanstalk',
      genre: 'adventure/fantasy',
      description: 'Young boy finds adventure in a giant beanstalk'
    });
  });

});
