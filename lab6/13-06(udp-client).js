const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message', (msg) => {
    console.log(`${msg}`);
});

setInterval(() => {
    const message = Buffer.from('Hello, server!');

    socket.send(message, 0, message.length, 4000, 'localhost', (err) => {
        if (err) {
            console.error(`Error sending message: ${err}`);
        } else {
            console.log(`${message}`);
        }
    });
}, 1000);
