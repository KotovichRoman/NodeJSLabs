const net = require('net');

net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`Received message from ${socket.remoteAddress}:${socket.remotePort}: ${data}`);
        socket.write(`ECHO: ${data}`);
    });
    socket.on('end', () => {
        console.log(`Disconnect!`);
    });
}).listen(3000, () => {
    console.log(`Server listening on port http://localhost:3000`);
});
