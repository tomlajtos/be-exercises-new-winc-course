import express from "express";
import getBooks from "./services/books/getBooks.js";
import getBookById from "./services/books/getBookById.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello again, World");
});

app.get("/books", (req, res) => {
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

app.get("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      res.status(404).send(`The book with id ${id} was not found!`);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Something went wrong while getting the book with the specified id!",
      );
  }
});

app.listen(3000, () => {
  console.log("The server is listening on port 3000");
});
