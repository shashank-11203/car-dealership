import { CarFront, LogOut, Plus, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <CarFront size={22} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Car Inventory
              </h1>

              <p className="text-xs text-slate-500">
                Dealership System
              </p>
            </div>
          </Link>

          {/* Right */}

          <div className="flex items-center gap-3">

            {user?.role === "admin" && (
              <Link
                to="/add-vehicle"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition

                ${
                  location.pathname === "/add-vehicle"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <Plus size={18} />

                <span className="hidden sm:block">
                  Add Vehicle
                </span>
              </Link>
            )}

            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">

              <User size={18} />

              <div>

                <p className="font-medium text-sm">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;