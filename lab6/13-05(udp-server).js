const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (message, remoteInfo) => {
    console.log(`${message}`);

    const response = Buffer.from(`ECHO: ${message}`);

    server.send(response, 0, response.length, remoteInfo.port, remoteInfo.address, (err) => {
        if (err) {
            console.error(`Error sending response: ${err}`);
        } else {
            console.log(`${response}`);
        }
    });
});

server.bind(4000, () => {
    console.log('server listening');
});
