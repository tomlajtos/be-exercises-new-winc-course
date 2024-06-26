import recordData from "../../data/records.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

const updateRecordById = (id, title, artist, year, available, genre) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new NotFoundError("record", id);
  }
  // nullish coalescing makes sure we preserve the original [key:value]
  // if there is no new [key:value] in the request body
  // this we it is also possible to use PUT instead of PATCH >> flexibility >> less/simpler code
  record.title = title ?? record.title;
  record.artist = artist ?? record.artist;
  record.year = year ?? record.year;
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
};

export default updateRecordById;
