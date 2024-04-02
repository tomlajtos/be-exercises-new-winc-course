import express from "express";

import getRecords from "../services/records/getRecords.js"; //! use the file extension
import getRecordById from "../services/records/getRecordById.js";
import createRecord from "../services/records/createRecord.js";
import updateRecordById from "../services/records/updateRecordById.js";
import deleteRecord from "../services/records/deleteRecord.js";

const router = express.Router();

router.get("/", (req, res) => {
  // only simple error handling since we're not dealing with
  // since we are not dealing with specific parameters (i.e. IDs etc.)
  try {
    const { artist, genre, available } = req.query;
    const records = getRecords(artist, genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of records!");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const record = getRecordById(id);

    if (!record) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json(record);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the record by id!");
  }
});

router.post("/", (req, res) => {
  try {
    const { title, artist, year, available, genre } = req.body;
    const newRecord = createRecord(title, artist, year, available, genre);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating the new record!");
  }
});

router.put("/:id", (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while updating the record by id!");
  }
});

router.delete("/records/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecordId = deleteRecord(id);

    if (!deletedRecordId) {
      res.status(404).send(`Record with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `The record with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    console.log("id of record to be deleted:", id);
    res.status(500).send("Something went wrong while deleting record by id!");
  }
});

export default router;
