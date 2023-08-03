"use client";

import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <div className=" py-8 text-center font-bold">
          <Link href="/signup">Go To Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
