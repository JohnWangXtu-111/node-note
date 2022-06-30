const http = require("http");

const httpServer = http.createServer((req, res) => {
  const method = req.method;
  if (method === "GET") {
    res.writeHead(200);
    res.write("GET");
    res.end();
  } else {
    let bodyArr = null;
    req.on("data", (data) => {
      bodyArr = bodyArr ? bodyArr.push(data) : [data];
      res.writeHead(200);
      res.write(Buffer.concat(bodyArr));
      res.end();
    });
  }
});

httpServer.listen(1111, () => {
  console.log("start server");
});
