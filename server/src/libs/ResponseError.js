const ResponseErrorTypes = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZE: 401,
  BAD_REQUEST: 400,
};

function ResponseError(error) {
  // mongoose validation errors
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map((key) => {
      return error.errors[key].message;
    });
    return { status: 422, response: { success: false, message: errors } };
  }
  // mongoose unique violation errors
  if (error.name === "MongoServerError" && error.code === 11000) {
    const errors = Object.keys(error.keyPattern).map((key) => {
      return `${key} already registered`;
    });
    return {
      status: 422,
      response: { success: false, message: errors },
    };
  }
  const { type: error_type, message: error_message } = error;

  let err = null;

  Object.keys(ResponseErrorTypes).forEach((key) => {
    if (error_type === ResponseErrorTypes[key])
      err = {
        status: ResponseErrorTypes[key],
        response: { success: false, message: error_message },
      };
  });

  if (err) return err;

  return {
    status: 500,
    response: { success: false, message: "something went wrong" },
  };
}

module.exports = {
  ResponseError,
  ResponseErrorTypes,
};
