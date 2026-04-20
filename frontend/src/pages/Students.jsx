import { useEffect, useMemo, useState } from "react";
import { GraduationCap, LoaderCircle, Pencil, Plus, Search, Trash2, UsersRound } from "lucide-react";
import AppShell from "../components/AppShell";
import api from "../lib/api";

const initialForm = {
  name: "",
  email: "",
  course: "",
};

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Unable to load students right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
    );
  }, [search, students]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      course: form.course.trim(),
    };

    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, payload);
        setStatus({ type: "success", message: "Student updated successfully." });
      } else {
        await api.post("/students", payload);
        setStatus({ type: "success", message: "Student added successfully." });
      }

      resetForm();
      await fetchStudents();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Could not save the student.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setEditingId(student.id);
    setStatus({ type: "", message: "" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this student record?");
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);
      setStatus({ type: "success", message: "Student deleted successfully." });
      if (editingId === id) {
        resetForm();
      }
      await fetchStudents();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Could not delete the student.",
      });
    }
  };

  return (
    <AppShell
      title="Student Directory"
      subtitle="Create, update, search, and review student records with a cleaner admin experience."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                {editingId ? "Edit Record" : "New Record"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {editingId ? "Update a student" : "Add a student"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Keep the directory current so result generation and dashboards stay meaningful.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
              {editingId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Full name</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="name"
                onChange={handleChange}
                placeholder="Aman Sharma"
                required
                value={form.name}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="email"
                onChange={handleChange}
                placeholder="student@example.com"
                required
                type="email"
                value={form.email}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Course</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                name="course"
                onChange={handleChange}
                placeholder="BCA / MCA / B.Tech"
                required
                value={form.course}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={saving}
                type="submit"
              >
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <GraduationCap className="h-4 w-4" />}
                {saving ? "Saving..." : editingId ? "Update Student" : "Add Student"}
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

        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/55 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Student records</h3>
              <p className="text-sm text-slate-400">A clean overview of the current academic directory.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-100 md:block">
                <UsersRound className="h-5 w-5" />
              </div>
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                <Search className="h-4 w-4 text-cyan-200" />
                <input
                  className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-500"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search students"
                  value={search}
                />
              </label>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 px-5 py-8 text-slate-300">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Loading students...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="px-5 py-8 text-slate-400">No students match your current search.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.25em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Course</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr className="border-t border-white/5" key={student.id}>
                      <td className="px-5 py-4 font-medium text-white">{student.name}</td>
                      <td className="px-5 py-4 text-slate-300">{student.email}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                          {student.course}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                            onClick={() => handleEdit(student)}
                            type="button"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-xs font-medium text-rose-100 transition hover:bg-rose-300/20"
                            onClick={() => handleDelete(student.id)}
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
        </section>
      </div>
    </AppShell>
  );
}

export default Students;
