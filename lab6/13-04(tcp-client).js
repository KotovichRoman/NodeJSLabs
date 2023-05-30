const net = require("net");

let number = process.argv[3] || 3;

const client = new net.Socket();
let timerId = null;
buf = new Buffer.alloc(4);

client.connect(40000, "127.0.0.1", function () {
    console.log("Connected");
    timerId = setInterval(() => {
        buf.writeInt32LE(number++, 0);
        client.write(buf);
    }, 1000);
});

client.on("data", function (data) {
    console.log(`${data.readInt32LE()}`);
});

client.on("close", function () {
    console.log("Connection closed");
});
