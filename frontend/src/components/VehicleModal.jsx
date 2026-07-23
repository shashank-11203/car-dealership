import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, CarFront } from "lucide-react";
import { toast } from "react-toastify";

import api from "../services/api";

function VehicleModal({
    isOpen,
    onClose,
    fetchVehicles,
    editVehicle,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (editVehicle) {
            reset({
                make: editVehicle.make,
                model: editVehicle.model,
                category: editVehicle.category,
                price: editVehicle.price,
                quantity: editVehicle.quantity,
            });
        } else {
            reset({
                make: "",
                model: "",
                category: "",
                price: "",
                quantity: "",
            });
        }
    }, [editVehicle, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            if (editVehicle) {
                await api.put(`/vehicles/${editVehicle._id}`, payload);

                toast.success("Vehicle Updated");
            } else {
                await api.post("/vehicles", payload);

                toast.success("Vehicle Added");
            }

            fetchVehicles();

            onClose();

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl border border-slate-200">

                {/* Header */}

                <div className="flex justify-between items-center p-6 border-b border-slate-200">

                    <div className="flex items-center gap-3">

                        <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">

                            <CarFront size={22} />

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold text-slate-900">

                                {editVehicle ? "Edit Vehicle" : "Add Vehicle"}

                            </h2>

                            <p className="text-slate-500 text-sm">

                                Fill vehicle information

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Make */}

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-slate-700">
                                Make
                            </label>

                            <input
                                {...register("make", {
                                    required: "Make is required",
                                })}
                                placeholder="Toyota"
                                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />

                            {errors.make && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.make.message}
                                </p>
                            )}
                        </div>

                        {/* Model */}

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-slate-700">
                                Model
                            </label>

                            <input
                                {...register("model", {
                                    required: "Model is required",
                                })}
                                placeholder="Fortuner"
                                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />

                            {errors.model && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.model.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-slate-700">
                                Category
                            </label>

                            <select
                                {...register("category", {
                                    required: "Category is required",
                                })}
                                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Hatchback</option>
                                <option>Luxury</option>
                                <option>Sports</option>
                                <option>Electric</option>
                            </select>

                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Price */}

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-slate-700">
                                Price
                            </label>

                            <input
                                type="number"
                                {...register("price", {
                                    required: "Price is required",
                                })}
                                placeholder="4500000"
                                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />

                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Quantity */}

                    <div>

                        <label className="block mb-1.5 text-sm font-medium text-slate-700">
                            Quantity
                        </label>

                        <input
                            type="number"
                            {...register("quantity", {
                                required: "Quantity is required",
                            })}
                            placeholder="10"
                            className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />

                        {errors.quantity && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.quantity.message}
                            </p>
                        )}

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
                        >
                            {editVehicle ? "Update Vehicle" : "Add Vehicle"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default VehicleModal;