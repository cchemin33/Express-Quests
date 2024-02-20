const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: "email", message: "This field is required" });
  }
  if (!firstname) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (!lastname) {
    errors.push({ field: "lastname", message: "This field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
