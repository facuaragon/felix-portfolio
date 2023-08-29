"use client";
import styles from "./notAuthorized.module.css";
import { signIn } from "next-auth/react";
export default function NotAuthorized() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Not NotAuthorized</div>
      <div className={styles.title}>Automatic LogOut</div>
    </div>
  );
}
