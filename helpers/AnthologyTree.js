const DB = require('../classes/Db');
const CL = require('../library/cyberleninka');
const Query = require('../classes/Query');
const treeBranchParsing = require('../helpers/treeBranchParsing');

const config = require('../config');
const db = new DB(config.db);

const cl = new CL();
const query = new Query(config.tables.tree);
const query_b = new Query (config.tables.branch);
const query_u = new Query (config.tables.urllist);
const pars_branch = new treeBranchParsing();

  const  getAnthologies = async (request, response) => {
    const res = await db.selectQuery(query.SelectAllTrees());
    console.log(res);
    response.status(200).json(res);
  }

  const  getBranches = async (request, response) => {
    const res = await db.selectQuery(query_b.SelectAllBranches());
    console.log(res);
    response.status(200).json(res);
  }

  const  getBranch = async (request, response) => {
    const res = await db.selectQuery(query_b.SelectBranchByTreeID(request.query.id));
    console.log(res);
    response.status(200).json(res);
  }

  const  getAnthology = async (request, response) => {
    const res = await db.selectQuery(query.SelectTreeById(request.query.id));
    console.log(res[0].content);
    response.status(200).json(res[0].content);
  }

  const  getUrlList = async (request, response) => {
    const branches = await db.selectQuery(query_b.SelectBranchByTreeID(request.query.id));
    await cl.getLeninka(branches);
    const res = await db.selectQuery(query_u.SelectUrlByTreeID(request.query.id));
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
      res = await db.insert(query.InsertTree(JSON.parse(parsedBody)));
      await pars_branch.branchPars(parsedBody);
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
  getAnthologies,
  getBranch,
  getBranches,
  getUrlList
}