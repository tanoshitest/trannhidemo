import React from "react";
import { CHART_DATA, STUDENTS, formatVND } from "@/data/mockData";
import { Users, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const StatCard: React.FC<{
  title: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  iconColor: string;
}> = ({ title, value, sub, icon: Icon, iconColor }) => (
  <div className="erp-card flex items-start justify-between">
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      <h3 className="text-xl font-bold mt-1.5 financial-number">{value}</h3>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
    <div className={`w-9 h-9 rounded-md flex items-center justify-center ${iconColor}`}>
      <Icon size={18} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const totalDebt = STUDENTS.reduce((sum, s) => sum + s.debt, 0);

  return (
    <div className="flex-1 flex flex-col space-y-4 min-h-0">
      <h1 className="text-lg font-bold shrink-0">Tổng quan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <StatCard
          title="Tổng học viên"
          value="128"
          sub="+12 học viên tháng này"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Thu tháng này"
          value={formatVND(67000000)}
          icon={TrendingUp}
          iconColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Chi tháng này"
          value={formatVND(28000000)}
          icon={TrendingDown}
          iconColor="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="Tổng công nợ"
          value={formatVND(totalDebt)}
          icon={AlertCircle}
          iconColor="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="erp-card flex-1 flex flex-col min-h-0">
        <h3 className="text-sm font-bold mb-4 shrink-0">Phân tích Thu – Chi (6 tháng gần nhất)</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
                tickFormatter={(v: number) => `${v / 1000000}M`}
              />
              <Tooltip
                cursor={{ fill: "hsl(210, 20%, 98%)" }}
                contentStyle={{ borderRadius: "6px", border: "1px solid hsl(220,13%,91%)", boxShadow: "none", fontSize: 12 }}
                formatter={(value: number) => [formatVND(value), ""]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: "16px", fontSize: 12 }} />
              <Bar dataKey="thu" name="Tổng Thu" fill="hsl(243, 75%, 59%)" radius={[3, 3, 0, 0]} barSize={32} />
              <Bar dataKey="chi" name="Tổng Chi" fill="hsl(215, 16%, 65%)" radius={[3, 3, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
