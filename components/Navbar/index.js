import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <>
      <header className={styles.navbar}>
        <Link href="/">felix ramallo</Link>
        <Link href="/">contacto</Link>
      </header>
    </>
  );
}
