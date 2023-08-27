"use client";
import styles from "./modal.module.css";
import { useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ onClose }) {
  const modalWrapperRef = useRef();
  const backDropHandler = useCallback((e) => {
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
  }, []);
  useEffect(() => {
    return () => window.removeEventListener("click", backDropHandler);
  }, []);
  const modalContent = (
    <div className={styles.modalOverlay}>
      <div ref={modalWrapperRef} className={styles.modalWrapper}>
        <div className={styles.modal}></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
}
