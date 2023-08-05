"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <div className="w-9/12 mx-auto">
      <h2>Dashboard</h2>
      <p>name : {session?.user?.name}</p>
    </div>
  );
};

export default Dashboard;
