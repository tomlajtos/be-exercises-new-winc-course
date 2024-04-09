import express from "express";

// ! use the file extension in imports
import authMiddleware from "../middleware/advancedAuth.js";
import getRecords from "../services/records/getRecords.js";
import getRecordById from "../services/records/getRecordById.js";
import createRecord from "../services/records/createRecord.js";
import updateRecordById from "../services/records/updateRecordById.js";
import deleteRecord from "../services/records/deleteRecord.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { artist, genre, available } = req.query;
  const records = getRecords(artist, genre, available);
  res.status(200).json(records);
});

router.post("/", authMiddleware, (req, res) => {
  const { title, artist, year, available, genre } = req.body;
  const newRecord = createRecord(title, artist, year, available, genre);
  res.status(201).json(newRecord);
});

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const record = getRecordById(id);

    res.status(200).json(record);
  },
  notFoundErrorHandler,
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const { title, artist, year, available, genre } = req.body;
    const updatedRecord = updateRecordById(
      id,
      title,
      artist,
      year,
      available,
      genre,
    );
    res.status(200).json(updatedRecord);
  },
  notFoundErrorHandler,
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);

    res.status(200).json({
      message: `The record with id ${deletedRecordId} was deleted!`,
    });
  },
  notFoundErrorHandler,
);

export default router;
