import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "A password reset link has been sent to your email.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error sending password reset email:", error);

      let message = "An error occurred. Please try again.";

      if (error.code === "auth/user-not-found") {
        message = "No user found with this email.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4 text-sm sm:text-base"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Send Reset Link
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
