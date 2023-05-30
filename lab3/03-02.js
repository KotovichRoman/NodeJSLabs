const http = require("http");
const url = require("url");

http.createServer((request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const parameter = queryObject.k;

    if(request.url.startsWith('/fact')){
        const fact = calculateFactorial(parseInt(parameter[0]));

        const responseBody = {
            k: parameter,
            fact: fact
        };

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(responseBody));
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