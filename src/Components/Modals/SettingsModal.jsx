import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { deleteCurrentUserAndData } from "../../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthServices/AuthContext";
import ThemeToggleButton from "../../Theme/ThemeToggleButton";
import CurrencySelector from "../../CurrencySelector/CurrencySelector";

const SettingsModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Lock scroll when modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleContactUsForm = () => {
    navigate("/contact-us-form");
  };

  const handleDeleteAccount = async () => {
    const confirm = await Swal.fire({
      title: "Delete Account?",
      text: "This will permanently delete your account and all saved data. This action cannot be undone. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
      cancelButtonText: "Cancel",
      width: "400px",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCurrentUserAndData(currentUser.uid);
        await Swal.fire({
          icon: "success",
          title: "Account Deleted",
          text: "Your account and all associated data have been permanently deleted. We’re sorry to see you go.",
          width: "350px",
          confirmButtonColor: "#3085d6",
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Deletion Failed",
          text: error.message || "An error occurred while deleting your account. Please try again later.",
          width: "350px",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-11/12 max-w-md relative mx-2 my-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-black dark:text-white">
          Settings
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm">
          Manage your account preferences and personalize your Money Manager experience.
        </p>

        <CurrencySelector />

        <div className="space-y-3 sm:space-y-4 mt-4">
          <button
            onClick={handleContactUsForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Contact Us
          </button>

          <button
            onClick={handleChangePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Change Password
          </button>

          <ThemeToggleButton />

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
          >
            Delete Account
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
          >
            Close Settings
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 sm:mt-6 text-center">
          For any assistance or feedback, please use the Contact Us option above. We’re here to support you.
        </p>
      </div>
    </div>
  );
};

export default SettingsModal;
