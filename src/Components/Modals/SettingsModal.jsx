import Swal from "sweetalert2";
import { deleteCurrentUserAndData } from "../../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthServices/AuthContext";
import ThemeToggleButton from "../../Theme/ThemeToggleButton";
import CurrencySelector from "../../CurrencySelector/CurrencySelector";

const SettingsModal = ({ onClose, }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChangePassword = () => {
    navigate("/change-password"); 
  };

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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          width: "300px",
        });
      }
    }
  };

 

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Settings</h2>
         <button
          onClick={handleChangePassword}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold mb-4 transition"
        >
          Change Password
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-4 transition"
        >
          Delete Account
        </button>

        <CurrencySelector />

        <button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
