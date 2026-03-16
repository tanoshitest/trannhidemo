import React, { useState } from "react";
import { Student, formatVND } from "@/data/mockData";
import { MoreVertical, X, Phone, Calendar, Plus } from "lucide-react";

interface StudentsProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, "id" | "enrollDate" | "status" | "attended" | "total" | "attendanceHistory" | "notes">) => void;
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

const AddStudentModal: React.FC<{ onClose: () => void; onAdd: (student: any) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "Piano",
    parentName: "",
    parentPhone: "",
    totalFee: 0,
    paid: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      debt: formData.totalFee - formData.paid,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-md border border-border w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-bold text-base">Thêm học viên mới</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Họ và tên</label>
            <input
              required
              className="erp-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Môn học</label>
              <select
                className="erp-select w-full"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option>Piano</option>
                <option>Guitar</option>
                <option>Violin</option>
                <option>Thanh nhạc</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">SĐT Phụ huynh</label>
              <input
                required
                className="erp-input"
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tên phụ huynh</label>
            <input
              required
              className="erp-input"
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Học phí khóa</label>
              <input
                type="number"
                required
                className="erp-input"
                value={formData.totalFee}
                onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Đã đóng</label>
              <input
                type="number"
                required
                className="erp-input"
                value={formData.paid}
                onChange={(e) => setFormData({ ...formData, paid: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="erp-btn-ghost flex-1">Hủy</button>
            <button type="submit" className="erp-btn-primary flex-1">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Students: React.FC<StudentsProps> = ({ students, onAddStudent }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Học viên</h2>
        <button onClick={() => setShowAddModal(true)} className="erp-btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm học viên
        </button>
      </div>

      <div className="erp-card p-0 overflow-hidden">
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
      </div>

      {selectedStudent && <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
      {showAddModal && <AddStudentModal onClose={() => setShowAddModal(false)} onAdd={onAddStudent} />}
    </div>
  );
};

export default Students;
