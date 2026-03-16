import React, { useState } from "react";
import { Student, Teacher, TEACHERS, formatVND } from "@/data/mockData";
import { MoreVertical, X, Phone, Mail, Calendar } from "lucide-react";

interface ProfilesProps {
  students: Student[];
}

const StudentDetail: React.FC<{ student: Student; onClose: () => void }> = ({ student, onClose }) => (
  <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-card rounded-md border border-border w-full max-w-lg max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-bold text-base">Hồ sơ học viên</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
            {student.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold">{student.name}</h4>
            <p className="text-sm text-muted-foreground">{student.subject}</p>
          </div>
          <span className={`ml-auto ${student.status === "Đang học" ? "erp-badge-success" : student.status === "Sắp hết khóa" ? "erp-badge-warning" : "erp-badge-danger"}`}>
            {student.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-secondary rounded-md p-3">
            <p className="text-muted-foreground text-xs">Phụ huynh</p>
            <p className="font-medium mt-0.5">{student.parentName}</p>
          </div>
          <div className="bg-secondary rounded-md p-3">
            <p className="text-muted-foreground text-xs flex items-center gap-1"><Phone size={10} /> SĐT</p>
            <p className="font-medium mt-0.5 financial-number">{student.parentPhone}</p>
          </div>
          <div className="bg-secondary rounded-md p-3">
            <p className="text-muted-foreground text-xs flex items-center gap-1"><Calendar size={10} /> Ngày nhập học</p>
            <p className="font-medium mt-0.5">{student.enrollDate}</p>
          </div>
          <div className="bg-secondary rounded-md p-3">
            <p className="text-muted-foreground text-xs">Tiến độ</p>
            <p className="font-medium mt-0.5">{student.attended}/{student.total} buổi</p>
          </div>
        </div>

        {/* Finance */}
        <div>
          <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Công nợ</h5>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-secondary rounded-md p-3">
              <p className="text-muted-foreground text-xs">Tổng phí</p>
              <p className="font-bold mt-0.5 financial-number">{formatVND(student.totalFee)}</p>
            </div>
            <div className="bg-secondary rounded-md p-3">
              <p className="text-muted-foreground text-xs">Đã đóng</p>
              <p className="font-bold mt-0.5 financial-number text-emerald-600">{formatVND(student.paid)}</p>
            </div>
            <div className="bg-secondary rounded-md p-3">
              <p className="text-muted-foreground text-xs">Còn nợ</p>
              <p className="font-bold mt-0.5 financial-number text-rose-600">{formatVND(student.debt)}</p>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        {student.attendanceHistory.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Lịch sử điểm danh gần đây</h5>
            <div className="space-y-1.5">
              {student.attendanceHistory.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm bg-secondary rounded-md px-3 py-2">
                  <span className="financial-number text-muted-foreground text-xs w-20">{h.date}</span>
                  <span className={`text-xs font-semibold ${h.status === "Có mặt" ? "text-emerald-600" : "text-rose-600"}`}>{h.status}</span>
                  {h.note && <span className="text-muted-foreground text-xs ml-auto">{h.note}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {student.notes.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ghi chú</h5>
            {student.notes.map((n, i) => (
              <p key={i} className="text-sm text-muted-foreground bg-secondary rounded-md px-3 py-2">{n}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const Profiles: React.FC<ProfilesProps> = ({ students }) => {
  const [subTab, setSubTab] = useState<"students" | "teachers">("students");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Quản lý hồ sơ</h1>

      <div className="erp-card p-0 overflow-hidden">
        {/* Sub-tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setSubTab("students")}
            className={`px-5 py-3 text-sm font-medium transition-colors ${subTab === "students" ? "border-b-2 border-primary text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            Học viên ({students.length})
          </button>
          <button
            onClick={() => setSubTab("teachers")}
            className={`px-5 py-3 text-sm font-medium transition-colors ${subTab === "teachers" ? "border-b-2 border-primary text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            Giáo viên ({TEACHERS.length})
          </button>
        </div>

        {subTab === "students" ? (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Môn học</th>
                <th>SĐT Phụ huynh</th>
                <th>Tiến độ</th>
                <th>Trạng thái</th>
                <th className="text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="cursor-pointer" onClick={() => setSelectedStudent(s)}>
                  <td className="font-medium">{s.name}</td>
                  <td className="text-muted-foreground">{s.subject}</td>
                  <td className="financial-number text-muted-foreground text-sm">{s.parentPhone}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-[80px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(s.attended / s.total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground financial-number">{s.attended}/{s.total}</span>
                    </div>
                  </td>
                  <td>
                    <span className={s.status === "Đang học" ? "erp-badge-success" : s.status === "Sắp hết khóa" ? "erp-badge-warning" : "erp-badge-danger"}>
                      {s.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Chuyên môn</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th className="text-right">Lương</th>
              </tr>
            </thead>
            <tbody>
              {TEACHERS.map((t) => (
                <tr key={t.id}>
                  <td className="font-medium">{t.name}</td>
                  <td className="text-muted-foreground">{t.specialty}</td>
                  <td className="financial-number text-muted-foreground text-sm">{t.phone}</td>
                  <td className="text-muted-foreground text-sm">{t.email}</td>
                  <td>
                    <span className={t.status === "Đang dạy" ? "erp-badge-success" : "erp-badge-danger"}>
                      {t.status}
                    </span>
                  </td>
                  <td className="text-right financial-number font-semibold">{formatVND(t.salary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedStudent && <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
};

export default Profiles;
