import { useEffect, useState } from "react";
import {
  CarFront,
  IndianRupee,
  Boxes,
  Search,
} from "lucide-react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVehicles = async () => {
    try {
      const url = search
        ? `/vehicles/search?make=${search}`
        : "/vehicles";

      const res = await api.get(url);

      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [search]);

  const totalVehicles = vehicles.length;

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  const totalValue = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your dealership inventory
            </p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Vehicles
                </p>

                <h2 className="text-3xl font-bold">
                  {totalVehicles}
                </h2>
              </div>

              <CarFront
                className="text-blue-600"
                size={34}
              />

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Stock
                </p>

                <h2 className="text-3xl font-bold">
                  {totalStock}
                </h2>
              </div>

              <Boxes
                className="text-green-600"
                size={34}
              />

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">

              <div>
                <p className="text-slate-500">
                  Inventory Value
                </p>

                <h2 className="text-xl font-bold">

                  ₹ {totalValue.toLocaleString("en-IN")}

                </h2>
              </div>

              <IndianRupee
                className="text-yellow-500"
                size={34}
              />

            </div>

          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

            <div className="relative">

              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={20}
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by make..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Vehicle Cards */}

          {vehicles.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">

              <CarFront
                size={50}
                className="mx-auto text-slate-400 mb-5"
              />

              <h2 className="text-2xl font-bold">
                No Vehicles Found
              </h2>

              <p className="text-slate-500 mt-2">
                Add a vehicle to get started.
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  fetchVehicles={fetchVehicles}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;