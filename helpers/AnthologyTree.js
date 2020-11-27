const DB = require('../classes/Db');
const Query = require('../classes/Query');

const config = require('../config');
const db = new DB(config.db);
const query = new Query(config.tables.tree)

  const  getAnthologies = async (request, response) => {
    const res = await db.selectQuery(query.SelectAllTrees());
    console.log(res);
    response.status(200).json(res);
  }

  const  getAnthology = async (request, response) => {
    const res = await db.selectQuery(query.SelectTreeById(request.query.id));
    console.log(res[0].content);
    response.status(200).json(res[0].content);
  }

  const addAnthology = async (request, response) => {
    let res = '';
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    await request.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      res = await db.insert(query.InsertTree(JSON.parse(parsedBody)));
      console.log(`message: ${JSON.stringify(res)}`);
      response.status(200).json({command:res.command, rowCount:res.rowCount});
    });
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
  deleteAnthology,
  getAnthologies
}