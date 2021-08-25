const express = require('express');
const {getAnthology, addAnthology, deleteAnthology,
    getAnthologies, getBranch,
    getBranches, getUrlUpdate, getDataByBranchId,
    uiGetAntol, uiGetBranch, uiGetUrl,
    getUrlOne, uiGetUrlTrOne, uiGetUrlBrOne} = require('./helpers/AnthologyTree');
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerConfig.json");

//API for Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.route('/Anthology')
   .get(getAnthology)
   .post(addAnthology)
   .delete(deleteAnthology)
app.route('/Anthologies')
   .get(getAnthologies)
app.route('/Branches')
   .get(getBranches)
app.route('/Branch')
   .get(getBranch)
app.route('/RunCollectDataByTreeId')
   .get(getUrlUpdate)
app.route('/DataByBranchId')
    .get(getDataByBranchId)
app.route('/urlone')
    .get(getUrlOne)

//API fro UI
app.route('/ui/anthology')
   .get(uiGetAntol)
app.route('/ui/branches')
    .get(uiGetBranch)
app.route('/ui/urllist')
    .get(uiGetUrl)
app.route('/ui/treebyid')
    .get(getAnthology)
app.route('/ui/branchbyid')
    .get(getBranch)
app.route('/ui/urlsbytreeid')
    .get(uiGetUrlTrOne)
app.route('/ui/urlsbybranchid')
    .get(uiGetUrlBrOne)


app.listen(4402, function(){
    console.log('Api start')
})
