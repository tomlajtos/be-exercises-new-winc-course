class NotFoundError extends Error {
  constructor(resourceType, resourceId) {
    super(`The ${resourceType} with ID: ${resourceId} was not found!`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
