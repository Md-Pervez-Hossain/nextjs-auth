"use client";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All Fields Fillup Needed");
    }
    try {
      const response = await fetch("api/userExits", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await response.json();
      console.log(user);
      if (user) {
        setError("user Already Exits");
        return;
      }
      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        reset();
      }
    } catch (error) {
      console.error("Error accessing headers:", error);
    }
  };
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="mb-5">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="border-2 mb-5 border-gray-200 px-4 py-2 rounded-lg w-full"
        />
        <button className="w-full bg-blue-500 px-4 py-2 text-white rounded-lg">
          Signup
        </button>
        {error && (
          <div>
            <p className="bg-red-600 px-6 py-3 my-5 text-white">{error}</p>
          </div>
        )}
        <div className=" py-8 text-center font-bold">
          <Link href="/login">Go To Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
