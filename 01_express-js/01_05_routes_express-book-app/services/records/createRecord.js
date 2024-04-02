// use uuid package installed as dependency to generate unique record IDs;
import { v4 as uuid } from "uuid";
import recordData from "../../data/records.json" assert { type: "json" };

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
