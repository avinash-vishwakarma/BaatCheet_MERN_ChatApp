exports.notFoundError = (req, res, next) => {
  next({
    status: 404,
    message: "resourse not found",
  });
};

exports.globalErroHandler = (
  { status = 500, message = "sorry something went wrong" },
  req,
  res,
  next
) => {
  res.status(status).json({
    status: "error",
    error: {
      message,
    },
  });
};
