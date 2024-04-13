import express from "express";
import getEvents from "../services/events/getEvents.js";
import getEventById from "../services/events/getEventById.js";

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const event = getEventById(id);
    if (!event) {
      res.status(404).send(`Can't find an event with id: ${id}!`);
    }
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(`Something went wrong while getting the event with id: ${id}!`);
  }
});

export default router;
