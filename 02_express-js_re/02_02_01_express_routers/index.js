import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello again, World");
});

app.listen(3000, () => {
  console.log("The server is listening on port 3000");
});
