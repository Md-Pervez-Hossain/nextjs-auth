import Dashboard from "@/Components/Dashboard/Dashboard";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
};

export default page;
