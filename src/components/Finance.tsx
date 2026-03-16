import React, { useState } from "react";
import { FinanceEntry, FINANCE_ENTRIES, formatVND } from "@/data/mockData";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const Finance: React.FC = () => {
  const [entries, setEntries] = useState<FinanceEntry[]>(FINANCE_ENTRIES);
  const [showModal, setShowModal] = useState<"thu" | "chi" | null>(null);
  const [form, setForm] = useState({ date: "", description: "", person: "", amount: "" });

  const thuEntries = entries.filter((e) => e.type === "thu");
  const chiEntries = entries.filter((e) => e.type === "chi");

  const handleAdd = () => {
    if (!form.description || !form.amount) return;
    const newEntry: FinanceEntry = {
      id: entries.length + 1,
      date: form.date || new Date().toLocaleDateString("vi-VN"),
      description: form.description,
      person: form.person,
      amount: Number(form.amount),
      type: showModal!,
    };
    setEntries([newEntry, ...entries]);
    setShowModal(null);
    setForm({ date: "", description: "", person: "", amount: "" });
    toast.success(`Đã thêm phiếu ${showModal === "thu" ? "thu" : "chi"} thành công!`);
  };

  const EntryTable: React.FC<{ items: FinanceEntry[]; type: "thu" | "chi" }> = ({ items, type }) => {
    const isThu = type === "thu";
    return (
      <div className="erp-card p-0 overflow-hidden">
        <div className={`p-4 border-b border-border flex justify-between items-center ${isThu ? "bg-emerald-50/50" : "bg-rose-50/50"}`}>
          <h4 className={`font-bold text-sm flex items-center gap-2 ${isThu ? "text-emerald-800" : "text-rose-800"}`}>
            Phiếu {isThu ? "Thu" : "Chi"}
          </h4>
          <button
            onClick={() => setShowModal(type)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md border transition-all ${
              isThu
                ? "text-emerald-700 border-emerald-200 bg-card hover:bg-emerald-100"
                : "text-rose-700 border-rose-200 bg-card hover:bg-rose-100"
            }`}
          >
            <Plus size={12} className="inline mr-1" /> Thêm mới
          </button>
        </div>
        <table className="erp-table text-sm">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Nội dung</th>
              <th>Người {isThu ? "nộp" : "nhận"}</th>
              <th className="text-right">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td className="financial-number text-muted-foreground">{e.date}</td>
                <td className="font-medium">{e.description}</td>
                <td className="text-muted-foreground">{e.person}</td>
                <td className={`text-right financial-number font-semibold ${isThu ? "text-emerald-600" : "text-rose-600"}`}>
                  {isThu ? "+" : "-"}{formatVND(e.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Quản lý Thu – Chi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EntryTable items={thuEntries} type="thu" />
        <EntryTable items={chiEntries} type="chi" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(null)}>
          <div className="bg-card rounded-md border border-border w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-bold text-sm">Thêm phiếu {showModal === "thu" ? "Thu" : "Chi"}</h3>
              <button onClick={() => setShowModal(null)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Ngày</label>
                <input type="date" className="erp-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Nội dung</label>
                <input className="erp-input" placeholder={showModal === "thu" ? "VD: Học phí tháng 10" : "VD: Lương giáo viên"} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{showModal === "thu" ? "Người nộp" : "Người nhận"}</label>
                <input className="erp-input" placeholder="Họ tên" value={form.person} onChange={(e) => setForm({ ...form, person: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Số tiền (VNĐ)</label>
                <input type="number" className="erp-input" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
            </div>
            <div className="p-5 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowModal(null)} className="erp-btn-ghost">Hủy</button>
              <button onClick={handleAdd} className="erp-btn-primary">Lưu phiếu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
