const pool = require('../utils/pool');


module.exports = class Movie {
    id;
    title;
    genre;
    description;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.genre = row.genre;
      this.description = row.description;
    }
    static async insert({ title, genre, description }) {
      const { rows } = await pool.query(
        'INSERT INTO movies (title, genre, description) VALUES ($1, $2, $3) RETURNING *',
        [title, genre, description]
      );
      return new Movie(rows[0]);
    }
    // static async findById(id) {
    //     const { rows } = await pool.query(
    //         'SELECT * FROM movie WHERE id = $1',
    //         [id]
    //     );
    //     if(!)
    // }
};
