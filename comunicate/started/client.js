const net = require("net");

const client = net.createConnection({
  port: 8081,
  host: "127.0.0.1",
});

client.on("connect", () => {
  for (let i = 1; i <= 5; ++i) {
    +(function (i) {
      setTimeout(() => {
        client.write(`John${i}`);
      }, 1000 * i);
    })(i);
  }
});
client.on("close", () => {
  console.log("客户端断开连接");
});
client.on("data", (chunk) => {
  console.log(chunk.toString());
});
