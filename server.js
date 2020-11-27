const express = require('express');
const {getAnthology, addAnthology, deleteAnthology, updateAnthology, getAnthologies} = require('./helpers/AnthologyTree');
const {getTree} = require('./helpers/Interface');
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerConfig.json");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.route('/Anthology')
   .get(getAnthology)
   .post(addAnthology)
   .patch(updateAnthology)
   .delete(deleteAnthology)
app
    .route('/Anthologies')
    .get(getAnthologies)
app.set('view engine', 'pug')
   .route('/interface')
   .get(getTree)

app.listen(4441, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})