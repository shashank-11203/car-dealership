const router = require("express").Router();

router.post("/register", (req, res) => {
  res.status(201).json({
    message: "Registered",
  });
});

module.exports = router;