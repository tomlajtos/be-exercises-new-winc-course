import recordData from "../../data/records.json" assert { type: "json" };

const updateRecordById = (id, title, author, isbn, pages, available, genre) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new Error(` with id ${id} was not found!`);
  }
  // nullish coalescing makes sure we preserve the original [key:value]
  // if there is no new [key:value] in the request body
  // this we it is also possible to use PUT instead of PATCH >> flexibility >> less/simpler code
  record.title = title ?? record.title;
  record.author = author ?? record.author;
  record.isbn = isbn ?? record.isbn;
  record.pages = pages ?? record.pages;
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
};

export default updateRecordById;
