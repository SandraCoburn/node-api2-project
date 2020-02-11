const express = require("express");

const postsRouter = require("./data/posts/posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Posts</h2> <p>Welcome to Posts</p>`);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server running on http://localhost:${port} ***\n`);
});
