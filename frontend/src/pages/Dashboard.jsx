import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  Boxes,
  IndianRupee,
  Plus,
  Search,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";
import VehicleModal from "../components/VehicleModal";
import StatCard from "../components/StatCard";
import api from "../services/api";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  // const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchVehicles = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const url = search
        ? `/vehicles/search?make=${search}`
        : "/vehicles";

      const res = await api.get(url);

      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
  fetchVehicles(true);
}, []);

  useEffect(() => {
    fetchVehicles();
  }, [search]);

  const openAddModal = () => {
    setEditVehicle(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditVehicle(null);
    setIsModalOpen(false);
  };

  const totalVehicles = vehicles.length;

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  const totalValue = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-5">

            <div>

              <h1 className="text-2xl font-semibold text-slate-900">
                Dashboard
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Welcome back,
                <span className="font-medium text-indigo-600 ml-1 capitalize">
                  {user?.name}
                </span>
              </p>

            </div>

            {user?.role === "admin" && (
              <button
                onClick={openAddModal}
                className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
              >
                <Plus size={18} />
                Add Vehicle
              </button>
            )}

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <StatCard
              title="Vehicles"
              value={totalVehicles}
              icon={<CarFront size={22} />}
              color="bg-indigo-600"
            />

            <StatCard
              title="Stock"
              value={totalStock}
              icon={<Boxes size={22} />}
              color="bg-emerald-600"
            />

            <StatCard
              title="Inventory Value"
              value={`₹ ${totalValue.toLocaleString("en-IN")}`}
              icon={<IndianRupee size={22} />}
              color="bg-amber-500"
            />

          </div>
          {/* Search */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">

            <SearchBar
              search={searchText}
              setSearch={setSearchText}
            />

            {/* </div> */}

          </div>

          {/* Vehicle Section */}

          {vehicles.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-16 text-center">

              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                <CarFront
                  size={28}
                  className="text-indigo-500"
                />
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                No vehicles found
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Start by adding your first vehicle.
              </p>

              {user?.role === "admin" && (

                <button
                  onClick={openAddModal}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-6
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    text-sm
                    font-medium
                    px-4
                    py-2.5
                    rounded-lg
                    shadow-sm
                    transition
                    cursor-pointer
                  "
                >
                  <Plus size={18} />

                  Add Vehicle

                </button>

              )}

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
              "
            >

              {vehicles.map((vehicle) => (

                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  fetchVehicles={fetchVehicles}
                  onEdit={openEditModal}
                />

              ))}

            </div>

          )}
        </div>

        {/* Floating Add Button (Mobile) */}

        {user?.role === "admin" && (
          <button
            onClick={openAddModal}
            className="
              sm:hidden
              fixed
              bottom-6
              right-6
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              p-4
              rounded-full
              shadow-lg
              transition
              cursor-pointer
            "
          >
            <Plus size={22} />
          </button>
        )}

      </div>

      {/* Vehicle Modal */}

      <VehicleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editVehicle={editVehicle}
        fetchVehicles={fetchVehicles}
      />

    </>
  );
}

export default Dashboard;