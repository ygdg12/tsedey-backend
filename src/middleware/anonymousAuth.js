// Attach anonymous user id from header for cart routes
const anonymousCartMiddleware = (req, res, next) => {
  const id = req.headers["x-anonymous-user-id"];
  req.anonymousUserId = typeof id === "string" && id.trim() ? id.trim() : null;
  next();
};

module.exports = { anonymousCartMiddleware };
