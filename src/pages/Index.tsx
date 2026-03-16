import React, { useState } from "react";
import { STUDENTS, Student } from "@/data/mockData";
import AppSidebar, { TabKey } from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import Dashboard from "@/components/Dashboard";
import Students from "@/components/Students";
import Teachers from "@/components/Teachers";
import Attendance from "@/components/Attendance";
import Tuition from "@/components/Tuition";
import Finance from "@/components/Finance";
import Classes from "@/components/Classes";
import { Toaster } from "sonner";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>(STUDENTS);

  const handleAttend = (studentId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId && s.attended < s.total
          ? { ...s, attended: s.attended + 1 }
          : s
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students students={students} />;
      case "teachers":
        return <Teachers />;
      case "classes":
        return <Classes students={students} />;
      case "attendance":
        return <Attendance students={students} onAttend={handleAttend} />;
      case "tuition":
        return <Tuition students={students} />;
      case "finance":
        return <Finance />;
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Toaster position="top-right" richColors />
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 p-6 overflow-auto no-scrollbar">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Index;
