import { Router } from "express";
import userData from "../data/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  const secretKey =
    process.env.AUTH_SECRET_KEY ||
    "my-obviously-not-very-secure-and-not-very-secret-key"; // we still need to provide a default value
  const { username, password } = req.body;
  const { users } = userData;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Succesful login!", token });
});

export default router;
