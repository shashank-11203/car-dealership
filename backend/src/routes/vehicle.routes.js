const router = require("express").Router();

const auth = require("../middlewares/auth");
const vehicleController = require("../controllers/vehicle.controller");

router.post("/", auth, vehicleController.createVehicle);

module.exports = router;