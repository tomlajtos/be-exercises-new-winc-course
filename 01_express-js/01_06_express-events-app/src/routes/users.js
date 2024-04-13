import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong while getting the list of users!");
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const user = getUserById(id);
    if (!user) {
      res.status(404).send(`Can't find a user with id: ${id}!`);
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(`Something went wrong while getting the user under id: ${id}!`);
  }
});

export default router;
