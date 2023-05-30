const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/api/name") {
        response.setHeader("Content-Type","text/plain");
        response.end("Kotovich Roman Vitalevich");
    }
    else if (request.url === "/fetch") {
        let file = fs.readFileSync("fetch.html");
        response.setHeader("Content-Type","text/html")
        response.end(file);
    }
}).listen(5005, "127.0.0.1", () => {
    console.log("The server is start");
});
