import React, { useState } from "react";
import { TEACHERS, formatVND } from "@/data/mockData";
import { Plus, X } from "lucide-react";

const AddTeacherModal: React.FC<{ onClose: () => void; onAdd: (teacher: any) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "Piano",
    phone: "",
    email: "",
    salary: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(),
      startDate: new Date().toLocaleDateString("vi-VN"),
      status: "Đang dạy",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-md border border-border w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-bold text-base">Thêm giáo viên mới</h3>
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
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chuyên môn</label>
              <select
                className="erp-select w-full"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              >
                <option>Piano</option>
                <option>Guitar</option>
                <option>Violin</option>
                <option>Thanh nhạc</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Số điện thoại</label>
              <input
                required
                className="erp-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              className="erp-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lương cơ bản</label>
            <input
              type="number"
              required
              className="erp-input"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
            />
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

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState(TEACHERS);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTeacher = (newTeacher: any) => {
    setTeachers((prev) => [newTeacher, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Giáo viên</h2>
        <button onClick={() => setShowAddModal(true)} className="erp-btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm giáo viên
        </button>
      </div>
      <div className="erp-card p-0 overflow-hidden">
        <table className="erp-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Chuyên môn</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Ngày bắt đầu</th>
              <th>Trạng thái</th>
              <th className="text-right">Lương</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td className="font-medium">{t.name}</td>
                <td className="text-muted-foreground">{t.specialty}</td>
                <td className="financial-number text-muted-foreground text-sm">{t.phone}</td>
                <td className="text-muted-foreground text-sm">{t.email}</td>
                <td className="text-muted-foreground text-sm">{t.startDate}</td>
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
      </div>
      {showAddModal && <AddTeacherModal onClose={() => setShowAddModal(false)} onAdd={handleAddTeacher} />}
    </div>
  );
};

export default Teachers;
