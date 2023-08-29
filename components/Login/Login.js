"use client";
import { useSession, signOut } from "next-auth/react";
import PleaseLogIn from "../PleaseLogIn";

export default function Login() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <PleaseLogIn />
      </>
    );
  }
}
