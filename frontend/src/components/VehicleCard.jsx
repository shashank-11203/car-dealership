import {
  CarFront,
  IndianRupee,
  Boxes,
  Pencil,
  Trash2,
  ShoppingCart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function VehicleCard({ vehicle, fetchVehicles }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const purchaseVehicle = async () => {
    try {
      await api.post(`/vehicles/${vehicle._id}/purchase`);

      toast.success("Vehicle purchased successfully");

      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    }
  };

  const deleteVehicle = async () => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await api.delete(`/vehicles/${vehicle._id}`);

      toast.success("Vehicle deleted");

      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-200 overflow-hidden">

      <div className="bg-blue-600 text-white p-6 flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {vehicle.make}
          </h2>

          <p className="opacity-90">
            {vehicle.model}
          </p>

        </div>

        <CarFront size={34} />

      </div>

      <div className="p-6">

        <div className="flex justify-between mb-4">

          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
            {vehicle.category}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold

            ${
              vehicle.quantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {vehicle.quantity > 0 ? "Available" : "Out of Stock"}
          </span>

        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-2">

            <IndianRupee
              size={18}
              className="text-blue-600"
            />

            <span className="font-semibold text-lg">

              {vehicle.price.toLocaleString("en-IN")}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Boxes
              size={18}
              className="text-blue-600"
            />

            <span>

              Stock : <strong>{vehicle.quantity}</strong>

            </span>

          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-2">

          <button
            onClick={purchaseVehicle}
            disabled={vehicle.quantity === 0}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl py-2 flex justify-center items-center gap-2 transition"
          >
            <ShoppingCart size={18} />

            Purchase
          </button>

          {user?.role === "admin" && (
            <>
              <button
                onClick={() =>
                  navigate(`/edit/${vehicle._id}`)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-4 py-2 transition"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={deleteVehicle}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 transition"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default VehicleCard;