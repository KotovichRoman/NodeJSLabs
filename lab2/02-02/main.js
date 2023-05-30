const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/png") {
        let file = fs.readFileSync("pic.png");
        response.setHeader("Content-Type","image/png");
        response.end(file);
    }
}).listen(5002, "127.0.0.1", () => {
    console.log("The server is start");
});