const http = require("http");
const fs = require("fs");
const url = require("url"); 
const figlet = require("figlet"); 
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname; 
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/otherpage") {
    fs.readFile("otherpage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/index.css") {
    fs.readFile("index.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/main.css") {
    fs.readFile("main.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/main.js") {
    fs.readFile("main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

