"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("Sign In Response:", res);

      if (res.error) {
        setError("Invalid credentials");
        return;
      }

      // If sign-in is successful, navigate to the profile page
      router.replace("/profile");
    } catch (error) {
      console.error("Sign In Error:", error);
      setError("An error occurred while signing in");
    }
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
        <button className="w-full mb-5 bg-blue-500 px-4 py-2 text-white rounded-lg">
          Signin
        </button>

        {error && <div className="text-red-500">{error}</div>}
        <div className=" py-8 text-center font-bold">
          <Link href="/signup">Go To Signup</Link>
        </div>
      </form>
      <button
        onClick={() => signIn("google")}
        className="w-full mb-5 bg-blue-500 px-4 py-2 text-white rounded-lg"
      >
        Signin With Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="w-full mb-5 bg-blue-500 px-4 py-2 text-white rounded-lg"
      >
        Signin With Github
      </button>
    </div>
  );
};

export default Login;
