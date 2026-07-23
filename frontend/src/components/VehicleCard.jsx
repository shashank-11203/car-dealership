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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 transition overflow-hidden">

      <div className="bg-indigo-600 text-white p-5 flex justify-between items-center">

        <div>
          <h2 className="text-lg font-semibold">
            {vehicle.make}
          </h2>

          <p className="text-indigo-100 text-sm">{vehicle.model}</p>
        </div>

        <CarFront size={28} />

      </div>

      <div className="p-5">

        <span className="inline-block bg-slate-100 text-slate-600 rounded-full px-3 py-1 text-xs font-medium">
          {vehicle.category}
        </span>

        <div className="mt-4 space-y-2">

          <div className="flex items-center gap-2 text-slate-700">
            <IndianRupee size={16} />
            <span className="font-semibold text-sm">
              {vehicle.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Boxes size={16} />
            <span>
              Stock : {vehicle.quantity}
            </span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-5">

          <button
            onClick={purchaseVehicle}
            disabled={vehicle.quantity === 0}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-lg py-2.5 flex justify-center items-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />

            Purchase
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() =>onEdit(vehicle)}
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg py-2.5 flex justify-center items-center gap-2 transition cursor-pointer"
            >
              <Pencil size={16} />

              Edit
            </button>
          )}

          {user?.role === "admin" && (
            <button
              onClick={deleteVehicle}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg py-2.5 flex justify-center items-center gap-2 transition cursor-pointer"
            >
              <Trash2 size={16} />

              Delete
            </button>
          )}

          {user?.role === "admin" && (
            <button
              onClick={restockVehicle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg py-2.5 flex justify-center items-center gap-2 transition cursor-pointer"
            >
              <RotateCcw size={16} />

              Restock
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default VehicleCard;