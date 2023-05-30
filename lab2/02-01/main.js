const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/html") {
        let file = fs.readFileSync("index.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }
}).listen(5000, "127.0.0.1", () => {
    console.log("The server is start");
});