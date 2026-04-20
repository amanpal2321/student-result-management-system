import { useEffect, useState } from "react";
import { Activity, BarChart3, GraduationCap, LoaderCircle, Sparkles, Trophy } from "lucide-react";
import AppShell from "../components/AppShell";
import api from "../lib/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    resultsGenerated: 0,
    passedStudents: 0,
    passPercentage: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      label: "Total students",
      value: stats.totalStudents,
      note: "Active records in your student directory.",
      icon: GraduationCap,
      accent: "from-cyan-300/25 to-transparent text-cyan-100",
    },
    {
      label: "Results generated",
      value: stats.resultsGenerated,
      note: "Saved academic performance records.",
      icon: BarChart3,
      accent: "from-amber-300/25 to-transparent text-amber-100",
    },
    {
      label: "Passed students",
      value: stats.passedStudents,
      note: "Students currently above the minimum threshold.",
      icon: Trophy,
      accent: "from-emerald-300/25 to-transparent text-emerald-100",
    },
    {
      label: "Pass percentage",
      value: `${stats.passPercentage}%`,
      note: "Calculated from all generated results.",
      icon: Activity,
      accent: "from-fuchsia-300/25 to-transparent text-fuchsia-100",
    },
  ];

  return (
    <AppShell
      title="Academic Command Center"
      subtitle="Track performance, monitor student outcomes, and keep every result workflow under control."
    >
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur"
                  key={card.label}
                >
                  <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br p-3 ${card.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-300">{card.label}</p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">
                    {loading ? <LoaderCircle className="h-8 w-8 animate-spin" /> : card.value}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{card.note}</p>
                </article>
              );
            })}
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Performance Pulse</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Average score overview</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  This panel gives your admin team a quick read on overall academic momentum across the generated results.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <p className="text-sm text-slate-300">Average score</p>
                <p className="mt-4 text-5xl font-semibold text-white">{stats.averageScore}</p>
                <p className="mt-4 text-sm text-slate-400">Based on the combined total marks stored in your system.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <p className="text-sm text-slate-300">What this means</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>Use the students page to add complete student records before publishing results.</li>
                  <li>Use the results page to generate totals and grades automatically from marks.</li>
                  <li>Each saved result updates these dashboard metrics in real time.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[30px] border border-white/10 bg-gradient-to-b from-cyan-300/15 via-white/5 to-transparent p-6 shadow-2xl shadow-cyan-950/20">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">Today&apos;s Focus</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Keep the academic office one step ahead</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            This dashboard is designed to give a fast, polished overview for school admins without making them dig through tables first.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <p className="text-sm text-slate-300">Recommended workflow</p>
              <p className="mt-2 text-base text-white">Register admin, add students, generate results, review dashboard.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <p className="text-sm text-slate-300">Academic Notice</p>
              <p className="mt-2 text-base text-white">Award Distribution to Ranker will be done on Monday. <br /> Academic will also be Open on Monday</p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export default Dashboard;
