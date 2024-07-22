import bookData from "../../data/books.json" assert { type: "json" };

const getBooks = (genre, available) => {
  let books = bookData.books;

  if (genre) {
    books = bookData.filter((book) => book.genre === genre);
  }

  if (available !== undefined) {
    books = bookData.filter((book) => book.available === JSON.parse(available));
  }

  return books;
};

export default getBooks;
