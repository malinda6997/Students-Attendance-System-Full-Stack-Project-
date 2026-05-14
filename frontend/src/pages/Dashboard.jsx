import { useEffect, useState } from "react";
import API from "../api/axios";
import { Users, UserCheck, UserX, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/students");
        const today = new Date().toISOString().split("T")[0];

        let present = 0;
        let absent = 0;

        data.forEach((student) => {
          const todayRecord = student.attendance?.find((a) => a.date === today);
          if (todayRecord?.status === "Present") present++;
          if (todayRecord?.status === "Absent") absent++;
        });

        setStats({
          totalStudents: data.length,
          presentToday: present,
          absentToday: absent,
        });
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: <Users size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: <UserCheck size={24} />,
      color: "bg-green-500",
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      icon: <UserX size={24} />,
      color: "bg-red-500",
    },
    {
      title: "Attendance Rate",
      value:
        stats.totalStudents > 0
          ? `${Math.round((stats.presentToday / stats.totalStudents) * 100)}%`
          : "0%",
      icon: <BarChart3 size={24} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-slate-800">Quick Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5"
          >
            <div className={`${card.color} text-white p-4 rounded-xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-slate-800">System Status</h3>
        <p className="text-gray-600">
          Welcome to the Student Attendance System. All systems are operational.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
