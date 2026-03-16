import React from "react";
import { TEACHERS, formatVND } from "@/data/mockData";

const Teachers: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Quản lý giáo viên</h1>

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
