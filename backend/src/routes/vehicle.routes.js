const router = require("express").Router();

const auth = require("../middlewares/auth");
const vehicleController = require("../controllers/vehicle.controller");

router.post("/", auth, vehicleController.createVehicle);
router.get("/", auth, vehicleController.getVehicles);
router.get("/search", auth, vehicleController.searchVehicles);

module.exports = router;