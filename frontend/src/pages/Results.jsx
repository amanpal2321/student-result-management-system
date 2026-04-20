import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookMarked,
  LoaderCircle,
  Pencil,
  Printer,
  Search,
  Sparkles,
  Trash2,
  Trophy,
} from "lucide-react";
import AppShell from "../components/AppShell";
import api from "../lib/api";
import { printResultReport } from "../utils/printReport";

const initialForm = {
  studentName: "",
  marks1: "",
  marks2: "",
  marks3: "",
};

function Results() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await api.get("/results");
      setResults(response.data);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Unable to load results right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return results;
    }

    return results.filter(
      (item) =>
        item.studentName.toLowerCase().includes(query) ||
        item.grade.toLowerCase().includes(query) ||
        String(item.total).includes(query)
    );
  }, [results, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = {
      studentName: form.studentName.trim(),
      marks1: Number(form.marks1),
      marks2: Number(form.marks2),
      marks3: Number(form.marks3),
    };

    try {
      if (editingId) {
        await api.put(`/results/${editingId}`, payload);
        setStatus({ type: "success", message: "Result updated successfully." });
      } else {
        await api.post("/results", payload);
        setStatus({ type: "success", message: "Result generated successfully." });
      }

      resetForm();
      await fetchResults();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Could not save the result.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      studentName: item.studentName,
      marks1: item.marks1,
      marks2: item.marks2,
      marks3: item.marks3,
    });
    setEditingId(item.id);
    setStatus({ type: "", message: "" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this result record?");
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/results/${id}`);
      setStatus({ type: "success", message: "Result deleted successfully." });
      if (editingId === id) {
        resetForm();
      }
      await fetchResults();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Could not delete the result.",
      });
    }
  };

  const topGradeCount = useMemo(
    () => results.filter((item) => item.grade === "A").length,
    [results]
  );

  return (
    <AppShell
      title="Result Studio"
      subtitle="Generate, edit, search, and manage academic results from one polished workspace."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.2fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur xl:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                {editingId ? "Edit Result" : "Result Builder"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {editingId ? "Update a result" : "Create a new result"}
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-300">
                Enter marks for three subjects and the backend will calculate the total and grade automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-300/10 p-3 text-cyan-100">
              {editingId ? <Pencil className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Student name</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              {["marks1", "marks2", "marks3"].map((field, index) => (
                <label className="block" key={field}>
                  <span className="mb-2 block text-sm text-slate-300">Subject {index + 1}</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                    name={field}
                    type="number"
                    min="0"
                    max="100"
                    value={form[field]}
                    onChange={handleChange}
                    placeholder="0-100"
                    required
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={saving}
                type="submit"
              >
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <BookMarked className="h-4 w-4" />}
                {saving ? "Saving..." : editingId ? "Update Result" : "Generate Result"}
              </button>
              {editingId ? (
                <button
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-slate-200 transition hover:bg-white/10"
                  onClick={resetForm}
                  type="button"
                >
                  Cancel
                </button>
              ) : null}
            </div>
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
        </section>

        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur">
              <p className="text-sm text-slate-300">Results generated</p>
              <p className="mt-3 text-3xl font-semibold text-white">{results.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur">
              <p className="text-sm text-slate-300">Top grades</p>
              <p className="mt-3 text-3xl font-semibold text-white">{topGradeCount}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur">
              <p className="text-sm text-slate-300">Latest status</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {results[0] ? `${results[0].studentName} - ${results[0].grade}` : "No data yet"}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/55 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Generated results</h3>
                <p className="text-sm text-slate-400">Every saved result is listed here for quick review.</p>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="hidden h-5 w-5 text-amber-300 md:block" />
                <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <Search className="h-4 w-4 text-cyan-200" />
                  <input
                    className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-500"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search results"
                    value={search}
                  />
                </label>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-3 px-5 py-8 text-slate-300">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Loading results...
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="flex items-center gap-3 px-5 py-8 text-slate-400">
                <AlertCircle className="h-4 w-4" />
                No results match your current search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-200">
                  <thead className="bg-white/5 text-xs uppercase tracking-[0.25em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Student</th>
                      <th className="px-5 py-4">Marks</th>
                      <th className="px-5 py-4">Total</th>
                      <th className="px-5 py-4">Grade</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((item) => (
                      <tr className="border-t border-white/5" key={item.id}>
                        <td className="px-5 py-4 font-medium text-white">{item.studentName}</td>
                        <td className="px-5 py-4 text-slate-300">
                          {item.marks1}, {item.marks2}, {item.marks3}
                        </td>
                        <td className="px-5 py-4">{item.total}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              item.grade === "A"
                                ? "bg-emerald-300/15 text-emerald-100"
                                : item.grade === "B"
                                  ? "bg-amber-300/15 text-amber-100"
                                  : "bg-rose-300/15 text-rose-100"
                            }`}
                          >
                            {item.grade}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/20"
                              onClick={() => printResultReport(item)}
                              type="button"
                            >
                              <Printer className="h-3.5 w-3.5" /> Print
                            </button>
                            <button
                              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                              onClick={() => handleEdit(item)}
                              type="button"
                            >
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-xs font-medium text-rose-100 transition hover:bg-rose-300/20"
                              onClick={() => handleDelete(item.id)}
                              type="button"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default Results;
