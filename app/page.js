"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return !session ? (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/login" className="border px-4 py-2 text-red-400 rounded">
        Dear User, Please Register first to see the Content, if already registered then please login.😊
      </Link>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-green-400 border p-5">
        {" "}
        Welcome, <span className="font-bold">{session.user?.fullname}</span>!
        , Please navigate to dashboard to view user details.😊
      </p>
    </div>
  );
}
