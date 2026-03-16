import React from "react";
import { Student, formatVND } from "@/data/mockData";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface TuitionProps {
  students: Student[];
}

const Tuition: React.FC<TuitionProps> = ({ students }) => {
  const sendNotice = (name: string) => {
    toast.info(`Đã gửi thông báo nhắc học phí tự động đến phụ huynh [${name}]`, {
      icon: <Send size={14} className="text-primary" />,
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Học phí & Công nợ</h1>

      <div className="erp-card p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-semibold text-sm">Theo dõi công nợ học viên</h3>
          <div className="flex gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="w-2 h-2 bg-rose-500 rounded-full" /> Quá hạn
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Đã hoàn tất
            </span>
          </div>
        </div>

        <table className="erp-table">
          <thead>
            <tr>
              <th>Học viên</th>
              <th>Khóa học</th>
              <th className="text-right">Tổng tiền</th>
              <th className="text-right">Đã đóng</th>
              <th className="text-right">Còn nợ</th>
              <th>Hạn đóng</th>
              <th className="text-right">Thông báo</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="font-medium">{s.name}</td>
                <td className="text-muted-foreground">{s.subject}</td>
                <td className="text-right financial-number">{formatVND(s.totalFee)}</td>
                <td className="text-right financial-number text-emerald-600">{formatVND(s.paid)}</td>
                <td className={`text-right financial-number font-semibold ${s.debt > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                  {formatVND(s.debt)}
                </td>
                <td className="text-sm text-muted-foreground">{s.dueDate}</td>
                <td className="text-right">
                  {s.debt > 0 ? (
                    <button
                      onClick={() => sendNotice(s.name)}
                      className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Send size={12} /> Gửi Zalo/SMS
                    </button>
                  ) : (
                    <span className="text-emerald-600 flex items-center justify-end gap-1 text-xs font-semibold">
                      <CheckCircle2 size={14} /> Đã đóng
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tuition;
