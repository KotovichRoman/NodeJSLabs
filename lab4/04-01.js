const http = require('http');
const url = require('url');
const fs = require('fs');
const EventEmitter = require('events');

const db = require('./db');

const myEmitter = new EventEmitter();

myEmitter.on('GET', (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(db.select()))
});

myEmitter.on('POST', (req, res) => {
    req.on('data', data => {
        let newPerson = JSON.parse(data)
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(db.insert(newPerson)))
    });
});

myEmitter.on('PUT', (req, res) => {
    req.on('data', data => {
        let updatedPerson = JSON.parse(data)
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(db.update(updatedPerson)))
    });
});

myEmitter.on('DELETE', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(db.deletePerson(parseInt(queryObject.id))));
});

http.createServer((request, response) => {
    if (request.url === '/') {
        let file = fs.readFileSync('./index.html');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(file);
    }

    if (request.url.startsWith('/api/db')) {
        myEmitter.emit(request.method, request, response);
    }
}).listen(5000, '127.0.0.1', () => {
    console.log("This server is starting");
});
