import Login from "@/Components/Login/Login";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");
  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default page;
