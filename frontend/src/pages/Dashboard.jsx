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
        <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Welcome back,
                <span className="font-semibold ml-2 capitalize">
                  {user?.name}
                </span>
              </p>

            </div>

            {user?.role === "admin" && (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                <Plus size={20} />
                Add Vehicle
              </button>
            )}

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

            <StatCard
              title="Vehicles"
              value={totalVehicles}
              icon={<CarFront size={28} />}
              color="bg-blue-600"
            />

            <StatCard
              title="Stock"
              value={totalStock}
              icon={<Boxes size={28} />}
              color="bg-green-600"
            />

            <StatCard
              title="Inventory Value"
              value={`₹ ${totalValue.toLocaleString("en-IN")}`}
              icon={<IndianRupee size={28} />}
              color="bg-yellow-500"
            />

          </div>
          {/* Search */}

          <div className="bg-white rounded-2xl shadow-sm p-5 mb-10">

            {/* <div className="relative"> */}

            {/* <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              /> */}

            {/* <input
                type="text"
                placeholder="Search by make..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  transition
                "
              /> */}

            <SearchBar
              search={searchText}
              setSearch={setSearchText}
            />

            {/* </div> */}

          </div>

          {/* Vehicle Section */}

          {vehicles.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-sm py-20 text-center">

              <CarFront
                size={70}
                className="mx-auto text-slate-400 mb-6"
              />

              <h2 className="text-3xl font-bold text-slate-700">
                No Vehicles Found
              </h2>

              <p className="text-slate-500 mt-3">
                Start by adding your first vehicle.
              </p>

              {user?.role === "admin" && (

                <button
                  onClick={openAddModal}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-8
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  <Plus size={20} />

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
                xl:grid-cols-3
                2xl:grid-cols-4
                gap-6
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
              md:hidden
              fixed
              bottom-6
              right-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              p-4
              rounded-full
              shadow-2xl
              transition
              hover:scale-110
            "
          >
            <Plus size={26} />
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