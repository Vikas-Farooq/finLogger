import React, { useState } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
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
        text: "Please login again to continue.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match. Please ensure both passwords are identical.",
      });
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      await Swal.fire({
        icon: "success",
        title: "Password Updated Successfully",
        text: "Your password has been changed. For security, always keep your password confidential.",
        confirmButtonColor: "#2563EB",
      });

      navigate("/home"); // adjust route as needed
    } catch (error) {
      console.error("Error updating password:", error);

      let message = "An error occurred. Please try again.";

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential" ||
        error.message.toLowerCase().includes("invalid-credential")
      ) {
        message = "Your current password is incorrect. Please check and try again.";
      } else if (error.code === "auth/weak-password") {
        message =
          "Your new password is too weak. Please choose a stronger password with a mix of letters, numbers, and symbols.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Please wait and try again later.";
      }

      Swal.fire({
        icon: "error",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Change Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          For your account’s security, please enter your current password and set a strong new password.
        </p>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
        />

        <input
          type="password"
          placeholder="New Password (min 6 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded transition duration-200"
        >
          Update Password
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white text-lg font-semibold py-3 rounded transition duration-200"
        >
          Cancel
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Tip: Use a unique password that you don't use elsewhere for better security.
        </p>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
