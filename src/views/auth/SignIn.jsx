import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      const userDoc = await getDoc(
        doc(db, "masteradmin", auth.currentUser.uid)
      );
      console.log("User authenticated successfully!");
      sessionStorage.setItem("adminID", auth.currentUser.uid);

      navigate("/admin/default");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("Error during sign-in: " + err.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h4 className="mb-6 text-center text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-8 text-center text-gray-600">
          Enter your details to sign in!
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700"
          >
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="mail@simmmple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-gray-700"
          >
            Password*
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Error Message */}
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSignIn}
          className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white shadow-sm transition duration-200 hover:bg-brand-600 active:bg-brand-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
