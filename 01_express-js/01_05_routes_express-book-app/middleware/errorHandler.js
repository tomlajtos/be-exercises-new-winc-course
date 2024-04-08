const errorHandler = (err, req, res, next) => {
  // Error handling logic
  // - for REST API the response should be in JSON format
  // - status code should remain 500
  // - should provide a general error message
  // - error should be logged (for collection and monitoring)
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
