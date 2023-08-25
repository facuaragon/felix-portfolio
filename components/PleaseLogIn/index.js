"use client";
import styles from "./pleaseLogIn.module.css";
import { signIn } from "next-auth/react";
export default function PleaseLogIn() {
  const logInAdmin = () => {
    signIn();
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Please Log In</div>
      <div className={styles.sign} onClick={logInAdmin}>
        Log In
      </div>
    </div>
  );
}
