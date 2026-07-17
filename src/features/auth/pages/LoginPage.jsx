import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Sky Connect</h1>

          <p className="mt-2 text-zinc-400">
            Connect with friends around the world.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-sky-500 hover:text-sky-400"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
