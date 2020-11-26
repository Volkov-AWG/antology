const DB = require('../classes/Db');
const config = require('../config');
const db = new DB(config.db);

  const  getAnthology = async (request, response) => {
    const res = await db.selectQuery(`Select content from ${config.tables.tree}`);
    console.log(res);
    response.status(200).json(res);
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
      console.log(`Body: ${parsedBody}`);
      const data = JSON.parse(parsedBody);
      console.log(`message: ${message}`);
      res = await db.insert(`insert into ${config.tables.tree}(name, content, description) values('${data.name}','${JSON.stringify(data.content)}', '');`);
      console.log(`message: ${JSON.stringify(res)}`);
      response.status(200).json({command:res.name.command, rowCount:res.name.rowCount});
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
  deleteAnthology
}