import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    clearError();

    const result = await registerUser(data);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm text-zinc-300 mb-2">Display Name</label>

        <input
          type="text"
          placeholder="Enter your display name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("displayName")}
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-2">Username</label>

        <input
          type="text"
          placeholder="Choose a username"
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
        <label className="block text-sm text-zinc-300 mb-2">Email</label>

        <input
          type="email"
          placeholder="Enter your email (optional)"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("email")}
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-2">Password</label>

        <input
          type="password"
          placeholder="Create a password"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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
        {isLoading ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;
