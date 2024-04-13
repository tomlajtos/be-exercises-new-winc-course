import express from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const category = getCategoryById(id);
    if (!category) {
      res.status(404).send(`Can't find a category with id: ${id}!`);
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(`Something went wrong while getting the category with id: ${id}!`);
  }
});

export default router;
