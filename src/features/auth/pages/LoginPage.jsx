import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Sky Connect</h1>
          <p className="text-zinc-400 mt-2">
            Connect with friends around the world.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-500 hover:text-sky-400 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
