import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // we use the same secretKey that we used for the JWK creation
  const secretKey =
    process.env.AUTH_SECRET_KEY ||
    "my-obviously-not-very-secure-and-not-very-secret-key"; // we still need to provide a default value

  // response for missing auth token in the auth header
  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  // use jwt.verify to check the token validity
  // NOTE: we only saved the user ID in the token body, for more complex validation
  // more user data (i.e. roles, permissions etc.) would be needed and further stepps toDateString();
  // validate those >> this would be best handled by a separate middleware
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token!" });
    }
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
