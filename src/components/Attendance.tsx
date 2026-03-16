import React, { useState } from "react";
import { Student, CLASSES } from "@/data/mockData";
import { toast } from "sonner";

interface AttendanceProps {
  students: Student[];
  onAttend: (studentId: number) => void;
}

const Attendance: React.FC<AttendanceProps> = ({ students, onAttend }) => {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id);
  const [attendanceDate, setAttendanceDate] = useState("2023-10-25");
  const [statuses, setStatuses] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});

  const currentClass = CLASSES.find((c) => c.id === selectedClass)!;
  const classStudents = students.filter((s) => currentClass.studentIds.includes(s.id));

  const handleSave = () => {
    classStudents.forEach((s) => {
      const status = statuses[s.id] || "present";
      if (status === "present") {
        onAttend(s.id);
      }
    });
    toast.success("Đã lưu điểm danh thành công!", { description: `${currentClass.name} — ${attendanceDate}` });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Điểm danh & Nhận xét</h1>

      {/* Controls */}
      <div className="erp-card flex flex-wrap items-center gap-4">
        <select
          className="erp-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(Number(e.target.value))}
        >
          {CLASSES.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="erp-select"
        />
        <span className="text-xs text-muted-foreground">GV: {currentClass.teacher}</span>
        <button onClick={handleSave} className="erp-btn-primary ml-auto">
          Lưu điểm danh
        </button>
      </div>

      {/* Table */}
      <div className="erp-card p-0 overflow-hidden">
        <table className="erp-table">
          <thead>
            <tr>
              <th>Học viên</th>
              <th className="text-center">Trạng thái</th>
              <th>Nhận xét của giáo viên</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-muted-foreground py-8">Không có học viên trong lớp này</td></tr>
            ) : (
              classStudents.map((s) => (
                <tr key={s.id}>
                  <td>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Còn lại: {s.total - s.attended} buổi</p>
                  </td>
                  <td>
                    <div className="flex justify-center gap-4">
                      {(["present", "absent", "excused"] as const).map((status) => {
                        const label = status === "present" ? "Có mặt" : status === "absent" ? "Vắng" : "Có phép";
                        const color = status === "present" ? "accent-emerald-600" : status === "absent" ? "accent-rose-600" : "accent-amber-500";
                        return (
                          <label key={status} className="flex items-center gap-1 cursor-pointer group">
                            <input
                              type="radio"
                              name={`att-${s.id}`}
                              className={color}
                              checked={(statuses[s.id] || "present") === status}
                              onChange={() => setStatuses((prev) => ({ ...prev, [s.id]: status }))}
                            />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground">{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nhập nhận xét..."
                      value={notes[s.id] || ""}
                      onChange={(e) => setNotes((prev) => ({ ...prev, [s.id]: e.target.value }))}
                      className="erp-input"
                    />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => {
                        onAttend(s.id);
                        toast.success(`Đã xác nhận buổi học cho ${s.name}`);
                      }}
                      className="text-xs font-semibold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-all"
                    >
                      Xác nhận học
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
