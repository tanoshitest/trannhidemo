import React from "react";
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, Wallet, BadgeDollarSign, ChevronLeft, ChevronRight, Music2, BookOpen,
} from "lucide-react";

export type TabKey = "dashboard" | "students" | "teachers" | "classes" | "attendance" | "tuition" | "finance";
interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const NAV_ITEMS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { key: "students", label: "Học viên", icon: Users },
  { key: "teachers", label: "Giáo viên", icon: GraduationCap },
  { key: "classes", label: "Lớp học", icon: BookOpen },
  { key: "attendance", label: "Điểm danh", icon: CalendarCheck },
  { key: "tuition", label: "Học phí", icon: Wallet },
  { key: "finance", label: "Thu - Chi", icon: BadgeDollarSign },
];

const AppSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside
      className="w-60 bg-sidebar flex flex-col shrink-0 transition-all duration-200 relative"
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shrink-0">
          <Music2 size={16} className="text-primary-foreground" />
        </div>
        <span className="text-sidebar-primary-foreground font-bold text-sm tracking-tight whitespace-nowrap">
          MELODY CENTER
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 mt-2 space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
