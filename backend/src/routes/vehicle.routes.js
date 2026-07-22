const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const vehicleController = require("../controllers/vehicle.controller");

router.post("/", auth, vehicleController.createVehicle);
router.get("/", auth, vehicleController.getVehicles);
router.get("/search", auth, vehicleController.searchVehicles);
router.put("/:id", auth, vehicleController.updateVehicle);
router.delete("/:id", auth, admin, vehicleController.deleteVehicle);
router.post("/:id/purchase", auth, vehicleController.purchaseVehicle);
router.post("/:id/restock", auth, admin, vehicleController.restockVehicle);

module.exports = router;