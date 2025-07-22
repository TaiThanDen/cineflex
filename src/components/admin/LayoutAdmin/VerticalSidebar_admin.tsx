import React from "react";
import {
  // LuLayoutDashboard,
  LuUsers,
  LuCreditCard,
  LuBadgeInfo,
  // LuLifeBuoy,
  LuLogOut,
} from "react-icons/lu";
import { MdMovie } from "react-icons/md";
import Logo from "../../../assets/img/logo.png";
import { Link, useLocation } from "react-router";

const navItems = [
  // {
  //   label: "Dashboard",
  //   icon: <LuLayoutDashboard size={18} />,
  //   to: "/admin/dashboard",
  // },
  {
    label: "Manage Movie",
    icon: <MdMovie size={18} />,
    to: "/admin/movies",
  },
  {
    label: "Manage Users",
    icon: <LuUsers size={18} />,
    to: "/admin/users",
  },
  {
    label: "Subscription",
    icon: <LuCreditCard size={18} />,
    to: "/admin/subscription",
  },
  {
    label: "Advertisment",
    icon: <LuBadgeInfo size={18} />,
    to: "/admin/ads",
  },
  // {
  //   label: "Content Moderation",
  //   icon: <LuShieldCheck size={18} />,
  //   to: "/admin/moderation",
  // },
  // {
  //   label: "Settings",
  //   icon: <LuSettings size={18} />,
  //   to: "/admin/settings",
  // },
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
            <li key={item.label} style={{ marginBottom: 15 }}>
              {item.to ? (
                <Link
                  to={item.to}
                  style={{
                    fontSize: 15,
                    color: location.pathname.startsWith(item.to)
                      ? "#6f63f6"
                      : "#636363",
                    background: location.pathname.startsWith(item.to)
                      ? "#d9d9ff"
                      : undefined,
                    fontWeight: location.pathname.startsWith(item.to)
                      ? 600
                      : 400,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <div
                  style={{
                    fontSize: 15,
                    color: "#636363",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 12px",
                    borderRadius: 10,
                  }}
                >
                  {item.icon}
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* <button
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
      </button> */}
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
