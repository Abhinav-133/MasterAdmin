import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      console.log(password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "masteradmin", userId), {
        email,
      });

      setSuccessMessage("Admin account created successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setError("Error during sign-up: " + err.message);
    }
  };

  return (
    <div className="flex h-screen items-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h4 className="mb-6 text-center text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-8 text-center text-gray-600">
          Create an admin account!
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
            variant="auth"
            id="email"
            type="email"
            placeholder="mail@simmmple.com"
            value={email}
            onChange={(e) => {
              console.log("Email input changed:", e.target.value);
              setEmail(e.target.value);
            }}
            className="w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-gray-700"
          >
            Password*
          </label>
          <input
            variant="auth"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              console.log("Password input changed:", e.target.value);
              setPassword(e.target.value);
            }}
            className="w-full rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Error Message */}
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {/* Success Message */}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500">{successMessage}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white shadow-sm transition duration-200 hover:bg-brand-600 active:bg-brand-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
