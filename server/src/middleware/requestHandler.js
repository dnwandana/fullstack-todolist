const errorHandler = (req, res, next) => {
  res.status(404).json({
    error: {
      message: "Page not found.",
    },
  })
}

const methodHandler = (method) => {
  return (req, res, next) => {
    res
      .status(405)
      .set({
        Allow: method,
      })
      .json({
        error: {
          message: "Method not allowed.",
        },
      })
  }
}

export { errorHandler, methodHandler }
