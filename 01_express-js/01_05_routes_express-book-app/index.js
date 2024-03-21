import express from "express";
import getBooks from "./services/books/getBooks.js"; //! use the file extension

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", (req, res) => {
  // only simple error handling since we're not dealing with
  // since we are not dealing with specific parameters (i.e. IDs etc.)
  try {
    const books = getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of books!");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port :3000");
});
