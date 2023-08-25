"use client";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "./userLogged.module.css";
import Image from "next/image";
import Link from "next/link";

export default function UserLogged({ user }) {
  const pathname = usePathname();
  const logOut = () => {
    signOut();
  };
  const logInAdmin = () => {
    signIn();
  };
  return (
    <div className={styles.container}>
      {user ? (
        <>
          <Image
            src={user.image}
            width={40}
            height={40}
            className={styles.image}
            alt={user.name}
          />
          <div>
            <p className={styles.name}>{user.name}</p>
            <div className={styles.options}>
              {pathname === "/admin" ? (
                <div className={styles.sign} onClick={logOut}>
                  Log Out
                </div>
              ) : (
                <>
                  <Link href="/admin">
                    <div className={styles.admin}>Go to Admin</div>
                  </Link>
                  <div className={styles.sign} onClick={logOut}>
                    Log Out
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : pathname.includes("/admin") ? (
        <div className={styles.sign} onClick={logInAdmin}>
          Log In
        </div>
      ) : (
        <Link href="/">contact</Link>
      )}
    </div>
  );
}
