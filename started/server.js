const net = require("net");

const server = net.createServer();

//端口 域名
server.listen(8081, "127.0.0.1");

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    const msg = chunk.toString();
    socket.write(Buffer.from(`你好 ${msg}`));
  });
});


server.on('close', () => {
  console.log('server is closed');
})

server.on('listening', () => {
  console.log('server is running');
})