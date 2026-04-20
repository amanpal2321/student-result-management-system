import { ClipboardList, Home, LogOut, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-900/30"
        : "text-slate-300 hover:bg-white/8 hover:text-white"
    }`;

  return (
    <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950/80 px-6 py-8 backdrop-blur lg:block">
      <div className="flex h-full flex-col">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/65">Admin Suite</p>
          <h2 className="mt-3 max-w-[12rem] text-3xl font-semibold leading-tight text-white">
            Campus performance hub
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Manage students, publish results, and keep academic reporting in one polished workspace.
          </p>
        </div>

        <nav className="mt-10 space-y-3">
          <NavLink className={navLinkClass} to="/dashboard">
            <Home className="h-4 w-4" /> Dashboard
          </NavLink>
          <NavLink className={navLinkClass} to="/students">
            <Users className="h-4 w-4" /> Students
          </NavLink>
          <NavLink className={navLinkClass} to="/results">
            <ClipboardList className="h-4 w-4" /> Results
          </NavLink>
        </nav>

        <div className="mt-auto rounded-[28px] border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-medium text-white">Ready for the next review?</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Keep your academic dashboard clean, current, and easy to understand for admins and staff.
          </p>
          <button
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-medium text-rose-100 transition hover:bg-rose-300/20"
            onClick={logout}
            type="button"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
