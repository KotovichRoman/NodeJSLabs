const net = require("net");
let sums = new Map();

function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters.charAt(randomIndex);
    }

    return key;
}

function addSum(key) {
    sums.set(key, 0);
}

function getData(sock, key) {
    sock.on("data", function (data) {
        console.log(
            `DATA ${sock.remoteAddress}:${sock.remotePort} -> ${data.readInt32LE()}`
        );

        const sum = data.readInt32LE();
        sums.set(key, sums.get(key) + sum);
    });
}

function closeConnect(sock) {
    sock.on("close", () => {
        console.log(`CLOSED: ${sock.remoteAddress}:${sock.remotePort}`);
    });
}

function error(sock) {
    sock.on("error", function () {
        console.log("ERROR EMMITED");
    });
}

net.createServer().listen(40000, "127.0.0.1", () => {
    console.log("Server is running on port 40000");
}).on("connection", function (sock) {
    let buffer = new Buffer.alloc(4);
    let key = generateRandomKey();
    addSum(key);

    setInterval(() => {
        buffer.writeInt32LE(sums.get(key), 0);
        sock.write(buffer);
    }, 5000);

    console.log(
        `Server 40000 CONNECTED: ${sock.remoteAddress}:${
            sock.remotePort
        }`
    );

    getData(sock, key);
    closeConnect(sock);
    error(sock);
});

net.createServer().listen(50000, "127.0.0.1", () => {
    console.log("Server is running on port 50000");
}).on("connection", function (sock) {
    let buffer = new Buffer.alloc(4);
    let key = generateRandomKey();
    addSum(key);

    setInterval(() => {
        buffer.writeInt32LE(sums.get(key), 0);
        sock.write(buffer);
    }, 5000);

    console.log(
        `Server 50000 CONNECTED: ${sock.remoteAddress}:${
            sock.remotePort
        }`
    );
    getData(sock, key);
    closeConnect(sock);
    error(sock);
});
