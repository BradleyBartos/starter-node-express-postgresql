
function hasOnlyValidProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data).filter(
      (field) => !properties.includes(field)
    );

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }
}

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { hasOnlyValidProperties, hasProperties };
