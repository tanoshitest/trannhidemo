export interface Student {
  id: number;
  name: string;
  subject: string;
  parentPhone: string;
  parentName: string;
  attended: number;
  total: number;
  status: "Đang học" | "Sắp hết khóa" | "Tạm nghỉ";
  debt: number;
  totalFee: number;
  paid: number;
  dueDate: string;
  enrollDate: string;
  notes: string[];
  attendanceHistory: { date: string; status: string; note: string }[];
}

export interface Teacher {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  status: "Đang dạy" | "Tạm nghỉ";
  salary: number;
  startDate: string;
}

export interface FinanceEntry {
  id: number;
  date: string;
  description: string;
  person: string;
  amount: number;
  type: "thu" | "chi";
}

export interface ChartData {
  month: string;
  thu: number;
  chi: number;
}

export const STUDENTS: Student[] = [
  { id: 1, name: "Nguyễn Văn An", subject: "Piano", parentPhone: "0901 234 567", parentName: "Nguyễn Thị Hoa", attended: 8, total: 12, status: "Đang học", debt: 500000, totalFee: 2400000, paid: 1900000, dueDate: "15/10/2023", enrollDate: "01/07/2023", notes: ["Tiến bộ tốt, cần luyện tập thêm bài Sonata"], attendanceHistory: [{ date: "20/10/2023", status: "Có mặt", note: "Hoàn thành bài tập" }, { date: "18/10/2023", status: "Có mặt", note: "" }] },
  { id: 2, name: "Trần Thị Bích", subject: "Guitar", parentPhone: "0912 345 678", parentName: "Trần Văn Minh", attended: 4, total: 12, status: "Đang học", debt: 0, totalFee: 2000000, paid: 2000000, dueDate: "20/10/2023", enrollDate: "15/08/2023", notes: [], attendanceHistory: [{ date: "19/10/2023", status: "Có mặt", note: "Tốt" }] },
  { id: 3, name: "Lê Hoàng Nam", subject: "Violin", parentPhone: "0987 654 321", parentName: "Lê Thị Mai", attended: 11, total: 12, status: "Sắp hết khóa", debt: 1200000, totalFee: 3000000, paid: 1800000, dueDate: "05/10/2023", enrollDate: "01/05/2023", notes: ["Chuẩn bị thi cuối khóa"], attendanceHistory: [{ date: "21/10/2023", status: "Vắng", note: "Nghỉ ốm" }] },
  { id: 4, name: "Phạm Minh Tâm", subject: "Piano", parentPhone: "0933 445 566", parentName: "Phạm Văn Đức", attended: 2, total: 12, status: "Đang học", debt: 0, totalFee: 2400000, paid: 2400000, dueDate: "25/10/2023", enrollDate: "01/10/2023", notes: [], attendanceHistory: [] },
  { id: 5, name: "Võ Thanh Hằng", subject: "Thanh nhạc", parentPhone: "0977 112 233", parentName: "Võ Minh Tuấn", attended: 6, total: 12, status: "Đang học", debt: 800000, totalFee: 2800000, paid: 2000000, dueDate: "10/10/2023", enrollDate: "15/06/2023", notes: ["Giọng soprano, cần luyện kỹ thuật hơi thở"], attendanceHistory: [{ date: "22/10/2023", status: "Có mặt", note: "Luyện bài hát mới" }] },
  { id: 6, name: "Đặng Quốc Bảo", subject: "Trống", parentPhone: "0966 778 899", parentName: "Đặng Thị Lan", attended: 9, total: 12, status: "Đang học", debt: 0, totalFee: 2200000, paid: 2200000, dueDate: "12/10/2023", enrollDate: "01/06/2023", notes: [], attendanceHistory: [] },
  { id: 7, name: "Huỳnh Ngọc Trinh", subject: "Guitar", parentPhone: "0944 556 677", parentName: "Huỳnh Văn Phú", attended: 10, total: 12, status: "Sắp hết khóa", debt: 600000, totalFee: 2000000, paid: 1400000, dueDate: "08/10/2023", enrollDate: "01/05/2023", notes: ["Cần ôn lại phần fingerpicking"], attendanceHistory: [] },
  { id: 8, name: "Bùi Thế Anh", subject: "Piano", parentPhone: "0911 223 344", parentName: "Bùi Văn Hùng", attended: 3, total: 12, status: "Đang học", debt: 2400000, totalFee: 2400000, paid: 0, dueDate: "01/10/2023", enrollDate: "15/09/2023", notes: ["Học viên mới, cần theo dõi sát"], attendanceHistory: [] },
];

export const TEACHERS: Teacher[] = [
  { id: 1, name: "Thầy Lê Quang", specialty: "Piano, Thanh nhạc", phone: "0905 111 222", email: "lequang@melody.vn", status: "Đang dạy", salary: 15000000, startDate: "01/01/2022" },
  { id: 2, name: "Cô Minh Thư", specialty: "Guitar, Ukulele", phone: "0905 333 444", email: "minhthu@melody.vn", status: "Đang dạy", salary: 12000000, startDate: "15/03/2022" },
  { id: 3, name: "Thầy Hoàng Dũng", specialty: "Violin, Viola", phone: "0905 555 666", email: "hoangdung@melody.vn", status: "Đang dạy", salary: 14000000, startDate: "01/06/2022" },
  { id: 4, name: "Cô Thanh Nga", specialty: "Thanh nhạc, Nhạc lý", phone: "0905 777 888", email: "thanhnga@melody.vn", status: "Tạm nghỉ", salary: 13000000, startDate: "01/09/2022" },
  { id: 5, name: "Thầy Đức Trọng", specialty: "Trống, Percussion", phone: "0905 999 000", email: "ductrong@melody.vn", status: "Đang dạy", salary: 11000000, startDate: "01/01/2023" },
];

export const FINANCE_ENTRIES: FinanceEntry[] = [
  { id: 1, date: "25/10/2023", description: "Học phí - Nguyễn Văn An", person: "Nguyễn Thị Hoa", amount: 1200000, type: "thu" },
  { id: 2, date: "24/10/2023", description: "Bán đàn Guitar Yamaha C40", person: "Khách lẻ", amount: 4500000, type: "thu" },
  { id: 3, date: "23/10/2023", description: "Học phí - Trần Thị Bích", person: "Trần Văn Minh", amount: 2000000, type: "thu" },
  { id: 4, date: "22/10/2023", description: "Học phí - Đặng Quốc Bảo", person: "Đặng Thị Lan", amount: 2200000, type: "thu" },
  { id: 5, date: "20/10/2023", description: "Bán sách nhạc lý cơ bản", person: "Khách lẻ", amount: 350000, type: "thu" },
  { id: 6, date: "25/10/2023", description: "Tiền điện tháng 10", person: "EVN", amount: 2450000, type: "chi" },
  { id: 7, date: "22/10/2023", description: "Lương GV - Thầy Lê Quang", person: "Lê Quang", amount: 15000000, type: "chi" },
  { id: 8, date: "22/10/2023", description: "Lương GV - Cô Minh Thư", person: "Minh Thư", amount: 12000000, type: "chi" },
  { id: 9, date: "20/10/2023", description: "Mua dây đàn Guitar (10 bộ)", person: "Shop nhạc cụ ABC", amount: 1500000, type: "chi" },
  { id: 10, date: "18/10/2023", description: "Tiền nước uống văn phòng", person: "Lavie", amount: 480000, type: "chi" },
];

export const CHART_DATA: ChartData[] = [
  { month: "Th.5", thu: 45000000, chi: 20000000 },
  { month: "Th.6", thu: 52000000, chi: 22000000 },
  { month: "Th.7", thu: 48000000, chi: 21000000 },
  { month: "Th.8", thu: 61000000, chi: 25000000 },
  { month: "Th.9", thu: 55000000, chi: 23000000 },
  { month: "Th.10", thu: 67000000, chi: 28000000 },
];

export const CLASSES = [
  { id: 1, name: "Lớp Piano Thứ 2 (18:00)", teacher: "Thầy Lê Quang", studentIds: [1, 4, 8] },
  { id: 2, name: "Lớp Guitar Thứ 3 (17:00)", teacher: "Cô Minh Thư", studentIds: [2, 7] },
  { id: 3, name: "Lớp Violin Thứ 4 (18:30)", teacher: "Thầy Hoàng Dũng", studentIds: [3] },
  { id: 4, name: "Lớp Thanh nhạc Thứ 5 (19:00)", teacher: "Cô Thanh Nga", studentIds: [5] },
  { id: 5, name: "Lớp Trống Thứ 6 (17:30)", teacher: "Thầy Đức Trọng", studentIds: [6] },
];

export const formatVND = (amount: number) => {
  return amount.toLocaleString("vi-VN") + " đ";
};
