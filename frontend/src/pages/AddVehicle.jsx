import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CarFront } from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../services/api";

function AddVehicle() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/vehicles", {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      });

      toast.success("Vehicle Added Successfully");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-4">

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <CarFront size={24} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Add Vehicle
              </h1>

              <p className="text-sm text-slate-500">
                Create a new inventory item
              </p>
            </div>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Make
              </label>
              <input
                placeholder="e.g. Toyota"
                {...register("make", { required: true })}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              {errors.make && (
                <p className="text-red-500 text-sm mt-1">
                  Make is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Model
              </label>
              <input
                placeholder="e.g. Fortuner"
                {...register("model", { required: true })}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">
                  Model is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category
              </label>
              <input
                placeholder="e.g. SUV"
                {...register("category", { required: true })}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  Category is required
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  {...register("price", { required: true })}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    Price is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="0"
                  {...register("quantity", { required: true })}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    Quantity is required
                  </p>
                )}
              </div>

            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 text-sm font-medium shadow-sm transition cursor-pointer"
            >
              Add Vehicle
            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default AddVehicle;