"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const master = process.env.NEXT_PUBLIC_MASTER_EMAIL;
  if (session) {
    if (session.user.email !== admin && session.user.email !== master) {
      alert("No estas autorizado, logout automatico");
      signOut();
    }
  }

  if (session && session.user) {
    return (
      <div className="">
        <div className="">
          <Image
            src={session.user.image}
            width={50}
            height={50}
            alt={session.user.name}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            priority={true}
          />
          <p className="">{session.user.name}</p>
        </div>
        <button className="" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <>
      <button
        className="text-white ml-auto bg-green-500"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
