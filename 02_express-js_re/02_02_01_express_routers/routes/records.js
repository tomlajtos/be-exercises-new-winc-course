import express from "express";
import getRecords from "../services/records/getRecords.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { artist, genre, available } = req.params;
    const records = getRecords(artist, genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error();
    res
      .status(500)
      .send("Something went wrong while getting the list of records!");
  }
});

export default router;
