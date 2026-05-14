import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, UserPlus, Users, ClipboardCheck } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  // Active link එක highlight කිරීමට function එකක්
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "hover:bg-slate-800 text-slate-300";

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">
      {/* Sidebar - fixed width with custom scroll */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen shrink-0 border-r border-slate-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-400 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-base">
              A
            </span>
            AttendPro
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            to="/"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive("/")}`}
          >
            <LayoutDashboard size={20} />{" "}
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            to="/students"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive("/students")}`}
          >
            <Users size={20} /> <span className="font-medium">Students</span>
          </Link>
          <Link
            to="/add-student"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive("/add-student")}`}
          >
            <UserPlus size={20} />{" "}
            <span className="font-medium">Add Student</span>
          </Link>
          <Link
            to="/attendance"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive("/attendance")}`}
          >
            <ClipboardCheck size={20} />{" "}
            <span className="font-medium">Attendance</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Malinda Prabath</p>
              <p className="text-xs text-slate-400 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header - Top navigation placeholder */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {location.pathname === "/"
              ? "Overview"
              : location.pathname.substring(1).replace("-", " ")}
          </h2>
          <div className="text-sm text-gray-400 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="p-8 flex-1">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
