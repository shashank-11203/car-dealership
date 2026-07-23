import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CarFront } from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../services/api";

function EditVehicle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await api.get(`/vehicles/${id}`);

      reset(res.data);
    } catch (err) {
      toast.error("Failed to load vehicle");
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.put(`/vehicles/${id}`, {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      });

      toast.success("Vehicle Updated");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message);
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
                Edit Vehicle
              </h1>

              <p className="text-sm text-slate-500">
                Update inventory details
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
                {...register("make")}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Model
              </label>
              <input
                {...register("model")}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category
              </label>
              <input
                {...register("category")}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price")}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 text-sm font-medium shadow-sm transition cursor-pointer"
            >
              Update Vehicle
            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default EditVehicle;