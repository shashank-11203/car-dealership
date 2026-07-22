exports.register = (req, res) => {
  res.status(201).json({
    message: "Registered",
  });
};