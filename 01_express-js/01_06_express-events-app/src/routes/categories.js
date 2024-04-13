import express from "express";
import getCategories from "../services/categories/getCategories.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const categories = getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Something went wrong while getting the list of categories!");
  }
});

export default router;
