const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/api/name") {
        response.setHeader("Content-Type","text/plain");
        response.end("Kotovich Roman Vitalevich");
    }
    else if (request.url === "/xmlhttprequest") {
        let file = fs.readFileSync("xmlhttprequest.html");
        response.setHeader("Content-Type","text/html")
        response.end(file);
    }
}).listen(5004, "127.0.0.1", () => {
    console.log("The server is start");
});
