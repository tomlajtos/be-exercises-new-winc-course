import { Router } from "express";
import userData from "../data/users.json";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  const secretKey = "my-obviously-not-very-secure-and-not-very-secret-key"; // only for practice exercise
  const { username, password } = req.body;
  const { users } = userData;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ useId: user.id }, secretKey);
  res.status(200).json({ message: "Succesful login!", token });
});

export default router;
