const http = require("http");
const url = require("url");
const fs = require('fs');

http.createServer((request, response) => {
    if(request.url.startsWith('/fact')){
        const queryObject = url.parse(request.url, true).query;
        const parameter = queryObject.k;

        factorialAsync(parameter, (error, fact) => {
            const responseBody = {
                k: parameter,
                fact: fact
            };

            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(responseBody));
        });
    }

    if(request.url === "/") {
        fs.readFile('index.html', (error, data) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
}).listen(5000, "127.0.0.1",() => {
    console.log(`The server is running`);
});

function factorialAsync(n, callback) {
    if (n === 0) {
        setImmediate(() => {
            callback(null, 1);
        });
    } else {
        setImmediate(() => {
            factorialAsync(n - 1, (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    const fact = n * result;
                    callback(null, fact);
                }
            });
        });
    }
}