const cluster = require("cluster");
const express = require("express");
const app = express();

if (cluster.isMaster) {
  cluster.fork();
} else {
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hello!");
  });

  app.listen(3000);
}
