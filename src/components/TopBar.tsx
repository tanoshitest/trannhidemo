import React from "react";
import { Search, Bell } from "lucide-react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm nhanh..."
          className="erp-input pl-9"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-5">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Quản trị viên</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="w-8 h-8 bg-secondary rounded-full border border-border" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
