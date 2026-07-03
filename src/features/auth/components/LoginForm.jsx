import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

function LoginForm() {
  const navigate = useNavigate();

  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    clearError();

    const result = await login(data);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Username</label>

        <input
          type="text"
          placeholder="Enter your username"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("username", {
            required: "Username is required",
          })}
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
