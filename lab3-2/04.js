const http = require('http');
const fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/task1") {
        let file = fs.readFileSync("task1.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task2") {
        let file = fs.readFileSync("task2.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task3") {
        let file = fs.readFileSync("task3.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task4") {
        let file = fs.readFileSync("task4.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task5") {
        let file = fs.readFileSync("task5.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task6") {
        let file = fs.readFileSync("task6.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }

    if (request.url === "/task7") {
        let file = fs.readFileSync("task7.html");
        response.setHeader("Content-Type","text/html");
        response.end(file);
    }
}).listen(3000, '127.0.0.1', () => {
   console.log("This server is starting");
});
