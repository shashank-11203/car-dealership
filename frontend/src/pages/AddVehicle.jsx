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

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-blue-600 p-3 rounded-xl text-white">
              <CarFront size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Add Vehicle
              </h1>

              <p className="text-slate-500">
                Create a new inventory item
              </p>
            </div>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <input
              placeholder="Make"
              {...register("make", { required: true })}
              className="w-full border rounded-xl p-3"
            />

            <input
              placeholder="Model"
              {...register("model", { required: true })}
              className="w-full border rounded-xl p-3"
            />

            <input
              placeholder="Category"
              {...register("category", { required: true })}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
              className="w-full border rounded-xl p-3"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
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