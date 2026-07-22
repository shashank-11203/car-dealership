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

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-yellow-500 p-3 rounded-xl text-white">
              <CarFront size={28} />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Edit Vehicle
              </h1>

              <p className="text-slate-500">
                Update inventory details
              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <input
              {...register("make")}
              className="w-full border rounded-xl p-3"
            />

            <input
              {...register("model")}
              className="w-full border rounded-xl p-3"
            />

            <input
              {...register("category")}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              {...register("price")}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              {...register("quantity")}
              className="w-full border rounded-xl p-3"
            />

            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 font-semibold transition"
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