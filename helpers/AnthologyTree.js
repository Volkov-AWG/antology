const DB = require('../classes/Db');
const config = require('../config');
const db = new DB(config.db);

  const  getAnthology = async (request, response) => {
    const res = await db.selectQuery('Select * from mytable;');
    console.log(res);
    response.status(200).json(res);
  }
  const addAnthology = async (request, response) => {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(`Body: ${parsedBody}`);
      console.log(`message: ${message}`);
    });
    response.status(200).json({name:'addAntology'});
  }

  const updateAnthology = async (request, response) => {
    response.status(200).json({name:'updateAntology'});
  }

  const deleteAnthology = async (request, response) => {
    response.status(200).json({name:'delAntology'});
  }
module.exports = {
    getAnthology,
    addAnthology,
  updateAnthology,
  deleteAnthology
}