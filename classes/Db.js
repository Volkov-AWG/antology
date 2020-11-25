const Pool = require('pg').Pool;

class Db {
  constructor(params) {
    this.pool = new Pool(params);
  }
    async selectQuery(query) {
        // Promise chain for pg Pool client
        const client = await this.pool
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
}

module.exports = Db;
