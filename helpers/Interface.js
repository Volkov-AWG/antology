
const  getTree = async (request, response) => {
    response
        .status(200)
        .render('index', { title: 'Hey', message: 'Hello there!'});
}
module.exports = {
    getTree
}