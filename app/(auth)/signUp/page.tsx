"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Correct import for useRouter

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [division, setDivision] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const signup = async () => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Signed up successfully");

      const user = userCredential.user;
      router.push("/signIn");

      // Additional user data
      const userProfile = {
        name: name,
        email: email,
        division: division,
        role: role,
      };

      try {
        // Write to Firestore
        const docRef = await addDoc(collection(db, "users"), userProfile);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // // Write to Firestore
      // await setDoc(doc(db, "users", user.uid), userProfile);
    } catch (error: any) {
      console.error("Error signing up:", error);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl">
        <h2 className="text-white text-lg mb-6">Sign Up</h2>
        <div className="flex">
          <div className="flex-1 pr-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-2.5 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-2.5 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-2.5 rounded-md"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex-1 pl-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-2.5 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Division
              </label>
              <select
                id="division"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-3 rounded-md text-m"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                required
              >
                <option value="">Select Division</option>
                <option value="SOC">SOC</option>
                <option value="SAT">SAT</option>
                <option value="IAM">IAM</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Role
              </label>
              <select
                id="role"
                className="shadow-sm bg-gray-700 border-gray-600 text-white block w-full p-3 rounded-md"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Member">Member</option>
                <option value="Leader">Leader</option>
                <option value="Head">Head</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        disabled={
          !name ||
          !email ||
          !password ||
          !confirmPass ||
          password !== confirmPass ||
          !division ||
          !role
        }
        onClick={() => signup()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Sign Up
      </button>
    </div>
  );
}
