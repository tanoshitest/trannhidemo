import React, { useState } from "react";
import { CLASSES, STUDENTS, TEACHERS, Student, Teacher } from "@/data/mockData";
import { Plus, X, Users, GraduationCap, Clock } from "lucide-react";
import { toast } from "sonner";

interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  studentIds: number[];
}

const Classes: React.FC<{ students: Student[] }> = ({ students }) => {
  const [classes, setClasses] = useState<ClassItem[]>(CLASSES);
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [formData, setFormData] = useState({ name: "", teacher: TEACHERS[0]?.name || "" });

  const handleAdd = () => {
    if (!formData.name.trim()) return;
    const newClass: ClassItem = {
      id: Date.now(),
      name: formData.name,
      teacher: formData.teacher,
      studentIds: [],
    };
    setClasses((prev) => [...prev, newClass]);
    setFormData({ name: "", teacher: TEACHERS[0]?.name || "" });
    setShowForm(false);
    toast.success("Đã thêm lớp học mới!");
  };

  const handleDelete = (id: number) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    if (selectedClass?.id === id) setSelectedClass(null);
    toast.success("Đã xóa lớp học!");
  };

  const getClassStudents = (cls: ClassItem) =>
    students.filter((s) => cls.studentIds.includes(s.id));

  const getTeacherInfo = (teacherName: string) =>
    TEACHERS.find((t) => teacherName.includes(t.name.split(" ").pop()!));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Quản lý Lớp học</h1>
        <button onClick={() => setShowForm(true)} className="erp-btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm lớp học
        </button>
      </div>

      {/* Class cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map((cls) => {
          const classStudents = getClassStudents(cls);
          const teacher = getTeacherInfo(cls.teacher);
          return (
            <div
              key={cls.id}
              className={`erp-card cursor-pointer transition-all hover:shadow-md ${
                selectedClass?.id === cls.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedClass(cls)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm">{cls.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <GraduationCap size={12} /> {cls.teacher}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cls.id);
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {classStudents.length} học viên
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {cls.name.match(/\(.*\)/)?.[0] || ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected class detail */}
      {selectedClass && (
        <div className="erp-card">
          <h2 className="font-semibold text-sm mb-3">
            Chi tiết: {selectedClass.name}
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Giáo viên: {selectedClass.teacher}
          </p>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Môn học</th>
                  <th className="text-center">Tiến độ</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {getClassStudents(selectedClass).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted-foreground py-8">
                      Chưa có học viên trong lớp
                    </td>
                  </tr>
                ) : (
                  getClassStudents(selectedClass).map((s) => (
                    <tr key={s.id}>
                      <td className="font-medium">{s.name}</td>
                      <td>{s.subject}</td>
                      <td className="text-center">
                        {s.attended}/{s.total} buổi
                      </td>
                      <td>
                        <span
                          className={`erp-badge ${
                            s.status === "Đang học"
                              ? "erp-badge-success"
                              : s.status === "Sắp hết khóa"
                              ? "erp-badge-warning"
                              : "erp-badge-danger"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add class modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center z-50">
          <div className="erp-card w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Thêm lớp học mới</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Tên lớp học</label>
                <input
                  className="erp-input mt-1"
                  placeholder="VD: Lớp Piano Thứ 7 (9:00)"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Giáo viên phụ trách</label>
                <select
                  className="erp-select mt-1"
                  value={formData.teacher}
                  onChange={(e) => setFormData((p) => ({ ...p, teacher: e.target.value }))}
                >
                  {TEACHERS.filter((t) => t.status === "Đang dạy").map((t) => (
                    <option key={t.id} value={t.name}>{t.name} — {t.specialty}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowForm(false)} className="erp-btn-secondary">Hủy</button>
              <button onClick={handleAdd} className="erp-btn-primary">Thêm lớp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
