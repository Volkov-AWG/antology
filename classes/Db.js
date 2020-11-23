const Pool = require('pg').Pool;

class Db {
  constructor(params) {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'changeme',
      port: 1111,
    });
  }

   async insert(query) {
    try {
      const client = await pool
          .connect()
          .catch(err => {
            console.log("pool .connect ->", err);
          });

      // Check that the pg client is valid
      if (client !== undefined) {
        const cc = await client.query(query);
        console.log(cc.rows);
        client.release();
        return cc.rows;
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  async select(query) {
    const client = await pool
        .connect()
        .catch(err => {
          console.log("pool .connect ->", err);
        });

    // Check that the pg client is valid
    if (client !== undefined) {
      const cc = await client.query(query);
      console.log(cc.rows);
      client.release();
      return cc.rows;
    }
  }

  async close() {
    try {
      await this.client.end();
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }
}

module.exports = Db;
