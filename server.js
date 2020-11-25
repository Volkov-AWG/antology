const express = require('express');
const {getAnthology, addAnthology, deleteAnthology, updateAnthology} = require('./helpers/AnthologyTree');
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerConfig.json");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app
    .route('/Anthology')
        .get(getAnthology)
        .post(addAnthology)
        .patch(updateAnthology)
        .delete(deleteAnthology)

app.listen(4444, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})