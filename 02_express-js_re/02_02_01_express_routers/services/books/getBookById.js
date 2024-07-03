import bookData from "../../data/books.json" assert { type: "json" };

const getBookById = (id) => {
  console.log(id, typeof id);
  return bookData.books.find((book) => book.id === id);
};

export default getBookById;
