"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const { status, data: session } = useSession();
  console.log(session); // Get the user's session
  const router = useRouter();

  if (!session) {
    // If the user is not authenticated, redirect to login page
    router.push("/login");
    return null;
  }
  if (status === "authenticated") {
    return (
      <div className="w-9/12 mx-auto">
        <h2>Profile</h2>
        <Image src={session.user.image} alt="" width={60} height={60} />
        <h2>Name: {session.user.name}</h2>
        <p>Email: {session.user.email}</p>
      </div>
    );
  }
};

export default Profile;
