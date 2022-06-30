const http = require("http");
const url = require("url");
const path = require("path");
const mime = require('mime');
const fs = require("fs");
const { fstat } = require("fs");
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }
    if (statObj.isFile()) {
      fs.readFile(filePath, (err, data) => {
        res.setHeader("Content-type", mime.getType(filePath) + ";charset=utf-8");
        res.end(data);
      });
    } else {
      fs.readFile(path.join(filePath, "index.html"), (err, data) => {
        res.setHeader("Content-type", mime.getType(filePath) + ";charset=utf-8");
        res.end(data);
      });
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running at 127.0.0.1");
});
