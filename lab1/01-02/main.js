const http = require("http");

http.createServer(function (request, response) {
    let requestBody = "";

    request.on("data", chunk => {
        requestBody += chunk;
    });

    request.on("end", () => {
        let requestInfo = `<div>Url: ${request.url}</div></br>
                           <div>Method: ${request.method}</div></br>
                           <div>Headers: ${JSON.stringify(request.headers)}</div></br>
                           <div>Http Version: ${request.httpVersion}</div></br>
                           <div>Body: ${requestBody}</div>`;

        response.end(requestInfo);
    });
}).listen(3030, "127.0.0.1", function() {
    console.log("the server is running");
});