const http = require("http");

http.createServer(function (request, response) {
    response.end("<h1>Hello world!</h1>");
}).listen(3030, "127.0.0.1", function() {
    console.log("the server is running");
});