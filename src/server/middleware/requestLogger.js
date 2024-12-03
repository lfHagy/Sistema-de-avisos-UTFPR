const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    ('Request Body:', req.body);
    next();
  };

module.exports = requestLogger;