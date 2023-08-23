"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./about.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.heading}>
        <div className={styles.name}>felix ramallo</div>
        <div className={styles.label}>Lorem ipsum</div>
      </div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </section>
  );
}
