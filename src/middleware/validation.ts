const schemaValidator = (Schema) => (req, _res, next) => {
  // validation
  try {
    const options = { abortEarly: false };
    const { error } = Schema.validate(req.body, options);

    if (!error) return next();

    const err = new Error("Validation failed");
    const data = error.details.map((errorObject) => errorObject.message);
    const statusCode = 422;

    next({ ...err, data, statusCode });
  } catch (error) {
    next(error);
  }
};

export default schemaValidator;
