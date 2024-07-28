import recordData from "../../data/records.json" assert { type: "json" };

const getRecords = (artist, genre, available) => {
  let records = recordData.records;

  if (artist) {
    records = recordData.filter((record) => record.artist === artist);
  }

  if (genre) {
    records = recordData.filter((record) => record.genre === genre);
  }

  if (available !== undefined) {
    records = recordData.filter((record) => record.avalable);
  }
  return records;
};

export default getRecords;
