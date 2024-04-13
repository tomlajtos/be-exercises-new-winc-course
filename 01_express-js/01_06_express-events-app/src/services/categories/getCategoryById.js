import categoryData from "../../data/categories.json" assert { type: "json" };

const getCategoryById = (id) => {
  const category = categoryData.categories.find(
    (category) => category.id === id,
  );
  if (!category) {
    console.error(
      `The category with id: ${id} does not exist or cannot be accessed!`,
    );
  }
  return category;
};

export default getCategoryById;
