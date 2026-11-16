var swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

var doc = {
    info: {
        title: "Users API",
        description: "The users API we built"
    },
    servers: [{ url: "/" }] //on base url we r serving this documentation
};

// Generate the docs from server.js, then start the server
//    file name in which doc will be stored made from reading server.js, reads all apis in server.js and generates documentation, then starts the server
swaggerAutogen("./swagger-output.json", ["./server.js"], doc).then(function () {
    require("./server.js");
});