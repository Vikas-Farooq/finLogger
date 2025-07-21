import React from "react";
import Swal from "sweetalert2";
import { deleteCurrentUserAndData } from "../../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthServices/AuthContext";

const SettingsModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleDeleteAccount = async () => {
    const confirm = await Swal.fire({
      title: "Delete Account?",
      text: "This will permanently delete your account and all data. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
      width: "350px",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCurrentUserAndData(currentUser.uid);
        await Swal.fire({
          icon: "success",
          title: "Account Deleted",
          text: "Your account and all data have been deleted.",
          width: "300px",
          confirmButtonColor: "#3085d6",
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        if (error.code === "auth/requires-recent-login") {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Please log in again before deleting your account.",
            width: "300px",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            width: "300px",
          });
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-4 transition"
        >
          Delete Account
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
