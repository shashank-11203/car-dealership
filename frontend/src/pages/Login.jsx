import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
      const response = await api.post("/auth/login", data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          🚗 Car Inventory
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="w-full border rounded p-3"
        />

        {errors.email && (
          <p className="text-red-500">
            Email is required
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
          className="w-full border rounded p-3"
        />

        {errors.password && (
          <p className="text-red-500">
            Password is required
          </p>
        )}

        <button
          className="bg-blue-600 w-full text-white rounded p-3"
        >
          Login
        </button>

        <p className="text-center">

          Don't have an account?

          <Link
            className="text-blue-600 ml-2"
            to="/register"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;