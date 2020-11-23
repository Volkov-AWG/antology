const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const Pool = require('pg').Pool;
const conString = 'postgres://postgres:changeme@ 0.0.0.0:1111'
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'changeme',
    port: 1111,
});

// Declare a string for the CRUD Postgres table
const tableName = "employee";

// Declare a constant for the CREATE TABLE SQL statement
const newTableSql = `CREATE TABLE ${tableName} (
id SERIAL NOT NULL,
name VARCHAR(255) NOT NULL,
address TEXT NOT NULL,
email VARCHAR(255) NOT NULL,
phone VARCHAR(20) NOT NULL
);`;

async function createTable() {
    // Promise chain for pg Pool client
    const client = await pool
        .connect()
        .catch(err => {
            console.log("pool .connect ->", err);
        });

    // Check that the pg client is valid
    if (client !== undefined) {
        await client.query(`DROP TABLE ${tableName};`, (err, res) => {
            // client is ready for the query() API call
            console.log("nclient ready:", client.readyForQuery, "n");

            // check for errors with client.query()
            if (err) {
                console.log("DROP TABLE ->", err);
            }
            if (res) {
                console.log("DROP TABLE result:", res);
            }
        });

        await client.query(newTableSql, (err, res) => {
            // check for errors with client.query()
            if (err) {
                console.log("nCREATE TABLE ->", err);
            }
            if (res) {
                console.log("nCREATE TABLE result:", res);
            }

            // Release the pg client instance after last query
            client.release();
            console.log("Client is released");
        });
    }
}

async function selectQuery(query) {
    // Promise chain for pg Pool client
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


const getAntology = async (request, response) => {
    const res = await selectQuery('Select * from mytable;');
    console.log(res);
    response.status(200).json(res);
}

const addAntology = (request, response) => {
    response.status(200).json({name:'addAntology'});
}

const updateAntology = (request, response) => {
    response.status(200).json({name:'updateAntology'});
}

const delAntology = (request, response) => {
    response.status(200).json({name:'delAntology'});
}
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0',
        },
    },
    apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app
    .route('/myTable')
    /**
     * @swagger
     * /getAntology:
     *   get:
     *     description: Get all data from my table
     *     responses:
     *       200:
     *         description: Success
     *
     */
    .get(getAntology)
    /**
     * @swagger
     * /addAntology:
     *   post:
     *     description: Get all books
     *     parameters:
     *      - name: title
     *        description: title of the book
     *        in: formData
     *        required: true
     *        type: string
     *     responses:
     *       201:
     *         description: Created
     */
    .post(addAntology)
    .patch(updateAntology)
    .delete(delAntology)

app.listen(4444, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})