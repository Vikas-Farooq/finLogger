import React, { useState } from "react";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "No user logged in",
        text: "Please login again.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      await Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been changed successfully.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/home"); // adjust route as needed
    } 
  catch (error) {
  console.error("Error updating password:", error);

  let message = "An error occurred. Please try again.";

  if (
    error.code === "auth/wrong-password" ||
    error.code === "auth/invalid-credential" || 
    error.message.toLowerCase().includes("invalid-credential")
  ) {
    message = "Invalid current password. Please check and try again.";
  } else if (error.code === "auth/weak-password") {
    message = "New password is too weak. Please choose a stronger password.";
  } else if (error.code === "auth/too-many-requests") {
    message = "Too many attempts. Please try again later.";
  }

  Swal.fire({
    icon: "error",
    // title: "Error",
    text: message,
  });
}



  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancel Password Change?",
      text: "Any changes you made will not be saved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Change Password
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
