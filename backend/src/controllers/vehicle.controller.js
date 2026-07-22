const Vehicle = require("../models/Vehicle");

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (make) query.make = new RegExp(make, "i");
    if (model) query.model = new RegExp(model, "i");
    if (category) query.category = new RegExp(category, "i");

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(query);

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      message: "Vehicle deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.purchaseVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle)
      return res.status(404).json({
        message: "Vehicle not found",
      });

    if (vehicle.quantity === 0)
      return res.status(400).json({
        message: "Out of stock",
      });

    vehicle.quantity--;

    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.restockVehicle = async (req, res) => {
  try {
    const { quantity } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle)
      return res.status(404).json({
        message: "Vehicle not found",
      });

    vehicle.quantity += Number(quantity);

    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};