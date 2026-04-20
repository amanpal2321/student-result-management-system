import { ClipboardList, Home, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppShell({ title, subtitle, children }) {
  const mobileLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.15),_transparent_25%),linear-gradient(180deg,_#020617,_#0f172a_45%,_#111827)]" />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar title={title} subtitle={subtitle} />
          <div className="px-4 pb-2 pt-4 md:px-6 lg:hidden">
            <div className="flex flex-wrap gap-2">
              <NavLink className={mobileLinkClass} to="/dashboard">
                <Home className="h-4 w-4" /> Dashboard
              </NavLink>
              <NavLink className={mobileLinkClass} to="/students">
                <Users className="h-4 w-4" /> Students
              </NavLink>
              <NavLink className={mobileLinkClass} to="/results">
                <ClipboardList className="h-4 w-4" /> Results
              </NavLink>
            </div>
          </div>
          <main className="flex-1 px-4 pb-6 pt-4 md:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
