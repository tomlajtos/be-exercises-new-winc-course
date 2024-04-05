import express from "express";

// ! use the file extension in imports
import authMiddleware from "../middleware/advancedAuth.js";
import getBooks from "../services/books/getBooks.js";
import getBookById from "../services/books/getBookById.js";
import createBook from "../services/books/createBook.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";

const router = express.Router();

router.get("/", (req, res) => {
  // only simple error handling since we're not dealing with
  // since we are not dealing with specific parameters (i.e. IDs etc.)
  try {
    const { genre, available } = req.query;
    const books = getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of books!");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the book by id!");
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating the new book!");
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre,
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating the book by id!");
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `The book with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    console.log("id of book to be deleted:", id);
    res.status(500).send("Something went wrong while deleting book by id!");
  }
});

export default router;
