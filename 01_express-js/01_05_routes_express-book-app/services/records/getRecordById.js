// use recordData as import reference since records.json has a records prop with an arr (of record objs) as value
// records would work as well then we would reference it as records.records in our function below
// recordData.records looks a bit better semantically
import recordData from "../../data/records.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

const getRecordById = (id) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new NotFoundError("record", id);
  }

  return record;
};

export default getRecordById;
