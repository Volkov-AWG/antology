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

//-----------------For Swagger
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
    console.log(res);
    response.status(200).json(res);
  }

  const  getUrlUpdate = async (request, response) => {
    const branches = await db.selectQuery(query_b.SelectBranchByTreeID(request.query.id));
    await cl.getLeninka(branches);
    const res = await db.selectQuery(query_u.SelectUrlByTreeID(request.query.id));
    response.status(200).json(res);
  }

  const  getUrlAll = async (request, response) => {
    const res = await db.selectQuery(query_u.SelectUrl());
    console.log(res);
    response.status(200).json(res);
  }
  const  getUrlOne = async (request, response) => {
    const res = await db.selectQuery(query_u.SelectUrlByTreeID(request.query.id));
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

//-----------------For UI

  const  uiGetAntol = async (request, response) => {
    const res = await db.selectQuery(query.SelectTreeForUi(decodeURIComponent(request.query.name), decodeURIComponent(request.query.desc)));
    console.log(res);
    response.status(200).json(res);
  }

  const  uiGetBranch = async (request, response) => {
    let id = "";
    if (request.query.id !== "")
    {
      id = "and treeid = " + request.query.id
    }
    const res = await db.selectQuery(query_b.SelectBranchForUi(id, decodeURIComponent(request.query.keys)));
    console.log(res);
    response.status(200).json(res);
  }
  const  uiGetUrl = async (request, response) => {
    let tid = "", bid = "";
    if (request.query.treeid !== "")
    {
      tid = "and ur.treeid = " + request.query.treeid
    }
    if (request.query.branchid !== "")
    {
      bid = "and ur.branchid = " + request.query.branchid
    }
    const res = await db.selectQuery(query_u.SelectUrlForUi(tid,bid,decodeURIComponent(request.query.treename),decodeURIComponent(request.query.keys), decodeURIComponent(request.query.name),decodeURIComponent(request.query.auth), decodeURIComponent(request.query.jour)));
    console.log(res);
    response.status(200).json(res);
  }
  const  uiGetUrlTrOne = async (request, response) => {
    const res = await db.selectQuery(query_u.SelectUrlByTreeID(request.query.id));
    console.log(res);
    response.status(200).json(res);
  }
  const  uiGetUrlBrOne = async (request, response) => {
    const res = await db.selectQuery(query_u.SelectUrlByBranchID(request.query.id));
    console.log(res);
    response.status(200).json(res);
  }



module.exports = {
  getAnthology, addAnthology, updateAnthology,
  deleteAnthology, getAnthologies, getBranch,
  getBranches, getUrlUpdate, getUrlAll,
  getUrlOne, uiGetAntol, uiGetBranch,
  uiGetUrl, uiGetUrlTrOne, uiGetUrlBrOne
}