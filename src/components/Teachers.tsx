import React from "react";
import { TEACHERS, formatVND } from "@/data/mockData";
import { Plus } from "lucide-react";

const Teachers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Giáo viên</h2>
        <button className="erp-btn-primary flex items-center gap-2">
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
            {TEACHERS.map((t) => (
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
    </div>
  );
};

export default Teachers;
