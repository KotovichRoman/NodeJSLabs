const http = require("http");

http.createServer((request, response) => {
    if (request.url === "/api/name") {
        response.setHeader("Content-Type","text/plain");
        response.end("Kotovich Roman Vitalevich");
    }
}).listen(5003, "127.0.0.1", () => {
    console.log("The server is start");
});
