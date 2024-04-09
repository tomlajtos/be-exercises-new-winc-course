// use uuid package installed as dependency to generate unique record IDs;
import { v4 as uuid } from "uuid";
import recordData from "../../data/records.json" assert { type: "json" };
// test throw -- for error handling
// throw new Error("Not implemented!");

const createRecord = (title, artist, year, available, genre) => {
  const newRecord = {
    id: uuid(),
    title,
    artist,
    year,
    available,
    genre,
  };

  recordData.records.push(newRecord);
  return newRecord;
};

export default createRecord;
