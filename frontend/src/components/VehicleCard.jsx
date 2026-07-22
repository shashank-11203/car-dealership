import {
  CarFront,
  IndianRupee,
  Boxes,
  ShoppingCart,
  Pencil,
  Trash2,
  RotateCcw,
} from "lucide-react";

import { toast } from "react-toastify";

import api from "../services/api";

function VehicleCard({ vehicle, fetchVehicles, onEdit }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const purchaseVehicle = async () => {
    try {
      await api.post(`/vehicles/${vehicle._id}/purchase`);

      toast.success("Vehicle Purchased");

      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const deleteVehicle = async () => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await api.delete(`/vehicles/${vehicle._id}`);

      toast.success("Vehicle Deleted");

      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const restockVehicle = async () => {
    const quantity = prompt("Enter quantity");

    if (!quantity) return;

    try {
      await api.post(`/vehicles/${vehicle._id}/restock`, {
        quantity,
      });

      toast.success("Vehicle Restocked");

      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden">

      <div className="bg-blue-600 text-white p-6 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            {vehicle.make}
          </h2>

          <p>{vehicle.model}</p>
        </div>

        <CarFront size={36} />

      </div>

      <div className="p-6">

        <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm">
          {vehicle.category}
        </span>

        <div className="mt-5 space-y-3">

          <div className="flex items-center gap-2">
            <IndianRupee size={18} />
            <span className="font-semibold">
              {vehicle.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Boxes size={18} />
            <span>
              Stock : {vehicle.quantity}
            </span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">

          <button
            onClick={purchaseVehicle}
            disabled={vehicle.quantity === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl py-3 flex justify-center items-center gap-2"
          >
            <ShoppingCart size={18} />

            Purchase
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() =>onEdit(vehicle)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
            >
              <Pencil size={18} />

              Edit
            </button>
          )}

          {user?.role === "admin" && (
            <button
              onClick={deleteVehicle}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
            >
              <Trash2 size={18} />

              Delete
            </button>
          )}

          {user?.role === "admin" && (
            <button
              onClick={restockVehicle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
            >
              <RotateCcw size={18} />

              Restock
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default VehicleCard;