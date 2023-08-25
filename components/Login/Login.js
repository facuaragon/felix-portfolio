"use client";
import { useSession, signOut } from "next-auth/react";
import PleaseLogIn from "../PleaseLogIn";

export default function Login() {
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const master = process.env.NEXT_PUBLIC_MASTER_EMAIL;
  if (session) {
    if (session.user.email !== admin && session.user.email !== master) {
      alert("You are not authorized, automatic logout");
      signOut();
    }
  }

  if (!session) {
    return (
      <>
        <PleaseLogIn />
      </>
    );
  }
}
