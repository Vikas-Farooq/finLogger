import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../AuthServices/AuthContext";
import { logoutUser } from "../../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SettingsModal from "../Modals/SettingsModal";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    });

    if (confirm.isConfirmed) {
      try {
        await logoutUser();
        navigate("/");
        Swal.fire("Logged out", "You have been logged out", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  return (
    <header className="w-full h-20 bg-gradient-to-r from-gray-800 to-blue-600 flex justify-between items-center px-6 shadow-md">
      <h1 className="text-white text-3xl font-bold tracking-wide">Dashboard</h1>

      <div className="relative text-white">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-200 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-white/30">
            <FaUserCircle size={18} />
          </div>
          <span className="text-sm font-medium capitalize tracking-wide">
            {currentUser?.displayName || currentUser?.email?.split("@")[0] || "Admin"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${openMenu ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 text-gray-700 font-semibold text-sm">
              {currentUser?.displayName || currentUser?.email?.split("@")[0] || "Admin"}
            </div>

            <button
              onClick={() => {
                setOpenMenu(false);
                setSettingsOpen(true);
              }}
              className="w-full text-left px-5 py-3 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 text-gray-700 font-medium"
            >
              <IoSettingsSharp className="text-gray-500" />
              Settings
            </button>

            <button
              onClick={() => {
                setOpenMenu(false);
                handleLogout();
              }}
              className="w-full text-left px-5 py-3 hover:bg-red-50 transition-colors duration-200 flex items-center gap-3 text-red-600 font-semibold"
            >
              <IoMdLogOut className="text-red-600" />
              Logout
            </button>
          </div>
        )}
      </div>

      {settingsOpen &&
       <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </header>
  );
};

export default Header;
