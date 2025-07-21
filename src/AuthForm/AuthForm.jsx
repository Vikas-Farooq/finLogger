import React, { useState } from "react";
import { updateProfile, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Loader/GlobalLoaderContext";
import Swal from "sweetalert2";
import loginImage from "../assets/login.png";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (userCredential.user.emailVerified) {
          Swal.fire("Success", "Logged in successfully!", "success");
          navigate("/home");
        } else {
          Swal.fire("Email not verified", "Please verify your email before logging in.", "warning");
          await auth.signOut();
        }

      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: username,
        });

        await sendEmailVerification(userCredential.user);

        Swal.fire(
          "Verification Email Sent",
          "Please check your email to verify your account before logging in.",
          "info"
        );
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-sky-100 overflow-hidden">
      <div className="relative w-full max-w-5xl h-5/6 rounded-xl shadow-lg overflow-hidden flex">
        {/* Image Section */}
        <div
          className={`hidden lg:block absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
            isLogin ? "left-1/2" : "left-0"
          }`}
        >
         <img
           src={loginImage}
            alt="Auth"
            className="w-full h-full object-contain rounded-l-xl rounded-r-none"
          />
        </div>

        {/* Form Section */}
        <div
          className={`absolute top-0 h-full w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out ${
            isLogin ? "left-0" : "left-1/2"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">
            {isLogin ? "Login to Your Account" : "Create a New Account"}
          </h1>

          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {isLogin && (
              <>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="text-gray-700">
                    Remember Me
                  </label>
                </div>

                <div className="mb-6 text-right">
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    Forgot Password?
                  </a>
                </div>
              </>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-gray-700 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline font-medium"
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
