const fs = require("fs");

const  getTree = async (request, response) => {
    fs.readFile("./views/index_.html", "utf-8", (error, data) => {

        let message = "Изучаем Node.js";
        let header = "First микросервис на Node JS Volkov A.A. Test v0.0000000001";
        data = data.replace("{header}", header)
                   .replace("{message}", message);
        response
            .status(200)
            .end(data);
    })
}

const saveTree = async (request, response) => {
   console.log(request.body);
   const data = JSON.stringify(request.body);
   response
       .status(200)
       .end(data);
}
module.exports = {
    getTree,
    saveTree
}