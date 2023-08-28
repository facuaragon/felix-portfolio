"use client";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "./userLogged.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

export default function UserLogged({ user }) {
  const pathname = usePathname();
  const [modal, setModal] = useState(false);

  const logOut = () => {
    signOut();
  };
  const logInAdmin = () => {
    signIn("google");
  };
  const handleModal = () => {
    if (!modal) {
      setModal(true);
    }
  };
  return (
    <div className={styles.container}>
      {modal && (
        <Modal
          onClose={() => {
            setModal(false);
          }}
          setModal={setModal}
        />
      )}
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
        <div className={styles.contact} onClick={handleModal}>
          contact
        </div>
      )}
    </div>
  );
}
