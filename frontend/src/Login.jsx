import { useState } from "react";
import { LoaderCircle, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "./lib/api";
import { saveAuth } from "./utils/auth";

function Login() {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [data, setData] = useState({ email: "", password: "", role: "ADMIN" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (isRegisterMode) {
        await api.post("/auth/register", {
          email: data.email.trim(),
          password: data.password,
          role: data.role,
        });
        setStatus({
          type: "success",
          message: "Account created successfully. You can now sign in with the same credentials.",
        });
        setIsRegisterMode(false);
      } else {
        const response = await api.post("/auth/login", {
          email: data.email.trim(),
          password: data.password,
        });

        saveAuth(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Authentication failed. Please verify your details.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_20%),linear-gradient(180deg,_#020617,_#0f172a_45%,_#111827)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <section className="hidden rounded-[36px] border border-white/10 bg-white/6 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur lg:block">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">Student Result Management</p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-tight text-white">
            A sharper way to manage students, marks, and academic insights.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Manage Student Records with Ease.<br />
           Easily add, update, and manage student details and exam results in one place. 
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/40 p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-200" />
              <h2 className="mt-4 text-xl font-semibold text-white">Services</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
               ✔ Track student performance <br /> 
✔ Generate results instantly <br /> 
✔ Simple and secure dashboard <br /> 
✔ Designed for schools and colleges <br />
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/40 p-5">
              <UserPlus className="h-6 w-6 text-amber-200" />
              <h2 className="mt-4 text-xl font-semibold text-white">Built for Education Institutes</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                
Result Generation
Generate and view student results with automatic calculations.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/60 backdrop-blur md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
            {isRegisterMode ? "Create Admin Account" : "Welcome Back"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {isRegisterMode ? "Set up your workspace" : "Sign in to your dashboard"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {isRegisterMode
              ? "Create the first admin account if this project is running for the first time."
              : "Use your registered admin credentials to manage students and publish results."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="email"
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                type="email"
                value={data.email}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Password</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="password"
                onChange={handleChange}
                placeholder="Enter a secure password"
                required
                type="password"
                value={data.password}
              />
            </label>

            {isRegisterMode ? (
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Role</span>
                <select
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                  name="role"
                  onChange={handleChange}
                  value={data.role}
                >
                  <option className="bg-slate-950" value="ADMIN">
                    ADMIN
                  </option>
                  <option className="bg-slate-950" value="STUDENT">
                    STUDENT
                  </option>
                </select>
              </label>
            ) : null}

            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting}
              type="submit"
            >
              {submitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : isRegisterMode ? (
                <UserPlus className="h-4 w-4" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {submitting ? "Please wait..." : isRegisterMode ? "Create Account" : "Login"}
            </button>
          </form>

          {status.message ? (
            <div
              className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                  : "border-rose-300/30 bg-rose-300/10 text-rose-100"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <div className="mt-6 text-sm text-slate-400">
            {isRegisterMode ? "Already have an account?" : "Running this project for the first time?"}{" "}
            <button
              className="font-medium text-cyan-200 transition hover:text-cyan-100"
              onClick={() => {
                setIsRegisterMode((current) => !current);
                setStatus({ type: "", message: "" });
              }}
              type="button"
            >
              {isRegisterMode ? "Back to login" : "Create the first account"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
