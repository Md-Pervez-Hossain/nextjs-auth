"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();
  console.log(session); // Get the user's session
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!session) {
    // If the user is not authenticated, redirect to login page
    router.push("/login");
    return null;
  }

  return (
    <div className="w-9/12 mx-auto text-center">
      <h2>Profile</h2>
      <h2>Name: {session.user.name}</h2>
      <p>Email: {session.user.email}</p>
      <button
        onClick={handleSignOut}
        className="bg-blue-600 px-6 py-3 text-white"
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
