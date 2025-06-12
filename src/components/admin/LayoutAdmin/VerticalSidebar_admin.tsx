import React from "react";
import {
  LuLayoutDashboard,
  LuListChecks,
  LuUsers,
  LuCreditCard,
  LuShieldCheck,
  LuSettings,
  LuLifeBuoy,
  LuLogOut,
} from "react-icons/lu";
import { MdMovie, MdOutlineAccountCircle } from "react-icons/md";
import { FaRegComments, FaBlog } from "react-icons/fa";
import Logo from "../../../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    icon: <LuLayoutDashboard size={18} />,
    active: true,
  },
  {
    label: "Manage Movie",
    icon: <MdMovie size={18} />,
  },
  {
    label: "Manage Quiz",
    icon: <LuListChecks size={18} />,
  },
  {
    label: "Manage Users",
    icon: <LuUsers size={18} />,
  },
  {
    label: "Subscription",
    icon: <LuCreditCard size={18} />,
  },
  {
    label: "Content Moderation",
    icon: <LuShieldCheck size={18} />,
  },
  {
    label: "Settings",
    icon: <LuSettings size={18} />,
  },
];

const VerticalSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside
      className="sidebar"
      style={{
        width: 250,
        background: "#f9fbfc",
        boxShadow: "0 0 25px rgb(0 0 0 / 0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 15px",
        minHeight: "100vh",
      }}
    >
      <div
        className="logo"
        style={{
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <img
          src={Logo}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold object-contain"
          alt="Logo"
        />
        <span className="text-[#6f63f6]">CINEFLEX</span>
      </div>
      <nav style={{ flexGrow: 1 }}>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className={item.active ? "active" : ""}
              style={{
                marginBottom: 15,
                fontSize: 15,
                color: item.active ? "#6f63f6" : "#636363",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                borderRadius: 10,
                userSelect: "none",
                background: item.active ? "#d9d9ff" : undefined,
                fontWeight: item.active ? 600 : 400,
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
          <li>
            <Link
              to="/admin/movies"
              className={location.pathname === "/admin/movies" ? "active" : ""}
            >
              Quản lý phim
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className="support-btn"
        style={{
          background: "#6f63f6",
          color: "white",
          border: "none",
          padding: "12px 15px",
          borderRadius: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          marginBottom: 20,
          userSelect: "none",
          boxShadow: "0 0 12px rgb(111 99 246 / 0.4)",
        }}
      >
        <LuLifeBuoy size={18} />
        Support
      </button>
      <div
        className="logout"
        style={{
          color: "#e65454",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          userSelect: "none",
          fontSize: 14,
        }}
      >
        <LuLogOut size={18} />
        Logout
      </div>
    </aside>
  );
};

export default VerticalSidebar;
