process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");
const express = require("express");
const crypto = require("crypto");

const app = express();

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
} else {
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hello!");
    });
  });

  app.get("/fast", (req, res) => {
    // doWork(5000);
    res.send("This was fast!");
  });

  app.listen(3000);
}
