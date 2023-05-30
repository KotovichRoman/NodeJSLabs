const http = require("http");
const readline = require("readline");

let state = 'norm';

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readlineInterface.setPrompt(`${state}->`);
readlineInterface.prompt();

readlineInterface.on('line', (input) => {
    switch (input.trim()) {
        case 'norm':
        case 'stop':
        case 'test':
        case 'idle': {
            console.log(`req = ${state}-->${input}\n${input}->`);
            state = input;
            break;
        }
        case 'exit': {
            console.log('exit');
            process.exit(0);
            break;
        }
        default: {
            console.log(input)
            break;
        }
    }
});

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<h1>${state}</h1>`);
}).listen(5000, "127.0.0.1",() => {
    console.log(`The server is running`);
});