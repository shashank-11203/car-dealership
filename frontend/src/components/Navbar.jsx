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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <CarFront size={20} />
            </div>

            <div>
              <h1 className="font-semibold text-base text-slate-900">
                Car Inventory
              </h1>

              <p className="text-xs text-slate-500">
                Dealership System
              </p>
            </div>
          </Link>

          {/* Right */}

          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-lg">

              <User size={16} className="text-slate-500" />

              <div>

                <p className="font-medium text-sm text-slate-800">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-lg transition cursor-pointer"
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