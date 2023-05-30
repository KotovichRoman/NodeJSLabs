const net = require('net');

const client = net.createConnection({ port:  3000 }, () => {
    const message = 'Hello, server!';
    client.write(message);
});

client.on('data', (data) => {
    console.log(data.toString());
    client.destroy();
});

client.on('end', () => {
    console.log('disconnected from server');
});

