// use uuid package installed as dependency to generate unique book IDs;
import { v4 as uuid } from "uuid";
import bookData from "../../data/books.json" assert { type: "json" };

const createBook = (title, author, isbn, pages, available, genre) => {
  // test throw -- for error handling
  // throw new Error("Not implemented!");

  const newBook = {
    id: uuid(),
    title,
    author,
    isbn,
    pages,
    available,
    genre,
  };

  bookData.books.push(newBook);
  return newBook;
};

export default createBook;
