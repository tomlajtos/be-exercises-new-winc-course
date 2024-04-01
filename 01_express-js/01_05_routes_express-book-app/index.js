//NOTE:
// the following concepts are not addressed at this section(routers), but at a later stage of the module:
// - request body validation
// - resource protection i.e. rate limiting (discussed in lessons about middleware)
// - adding persistent data storage

import express from "express";

const app = express();
// needed for the express app to parse incomming JSON in the request body
// (i.e. in post requests), it's a built in middleware function
app.use(express.json());

app.get("/", (req, res) => {
  const html = `<html><h1>Welcome to the Express Bookstore</h1> 
     <p>This is a test app to learn back-end programming with Express.js</p></html>`;
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server is listening on port :3000");
});
