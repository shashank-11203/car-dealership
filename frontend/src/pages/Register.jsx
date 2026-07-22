import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing dealership inventory"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;