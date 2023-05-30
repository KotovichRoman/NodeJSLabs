const http = require("http");
const url = require("url");
const fs = require('fs');

http.createServer((request, response) => {
    if(request.url.startsWith('/fact')){
        const queryObject = url.parse(request.url, true).query;
        const parameter = queryObject.k;
        const fact = calculateFactorial(parseInt(parameter[0]));

        const responseBody = {
            k: parameter,
            fact: fact
        };

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(responseBody));
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

function calculateFactorial(k) {
    if (k <= 1) {
        return 1;
    } else {
        return k * calculateFactorial(k - 1);
    }
}