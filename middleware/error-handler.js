const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: Object.values(err.errors)
        .map((val) => val.message)
        .join(', '),
    });
  }

  if (err.code && err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({
      msg: `Duplicate value for ${Object.keys(err.keyValue)}`,
    });
  }

  const responceJson = {
    msg: 'Internal Server Error',
  };
  if (process.env.NODE_ENV === 'development') {
    responceJson.msgerror = err.message;
    responceJson.stack = err.stack?.substring(0, 500);
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responceJson);
};

module.exports = errorHandlerMiddleware;
