import express from "express";
import getEvents from "../services/events/getEvents.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const events = getEvents();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong while getting the list of events!");
  }
});

export default router;
