"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const { status, data: session } = useSession();
  console.log(session); // Get the user's session
  // const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className=" w-9/12 mx-auto flex justify-between items-center font-bold py-10 text-xl">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div className="flex items-center gap-5">
        {status === "authenticated" ? (
          <>
            {" "}
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <Image
              src={session?.user?.image}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
            <button
              onClick={handleSignOut}
              className="bg-blue-600 px-6 py-3 text-white"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
