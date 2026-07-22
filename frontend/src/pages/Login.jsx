import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to manage dealership inventory"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
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
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;