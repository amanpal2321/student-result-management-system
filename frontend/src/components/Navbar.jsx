import { Bell, Search } from "lucide-react";
import { getAuth } from "../utils/auth";

function Navbar({ title, subtitle }) {
  const auth = getAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Student Result Manager</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <Search className="h-4 w-4 text-cyan-200" />
            <span className="text-sm">Live academic workspace</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="rounded-full bg-cyan-300/15 p-2 text-cyan-200">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{auth?.email || "Admin"}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{auth?.role || "ADMIN"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
