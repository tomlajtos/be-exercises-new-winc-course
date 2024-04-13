import express from "express";
import getUsers from "../services/users/getUsers.js";

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

export default router;
