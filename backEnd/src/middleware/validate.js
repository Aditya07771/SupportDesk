const validate = (requiredFields) => {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === '') {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }
    next();
  };
};

module.exports = validate;
