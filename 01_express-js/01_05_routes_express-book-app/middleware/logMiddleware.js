import logger from "../utils/logger.js";

const log = (req, res, next) => {
  const before = performance.now();

  next();

  const processTimeInMs = performance.now() - before;

  logger.info(
    `method: ${req.method}, URL: ${req.originalUrl}, status: ${res.statusCode}, time to process (ms): ${processTimeInMs.toFixed(3)}`,
  );
};
export default log;
