import Image from "next/image";
import styles from "./projectCard.module.css";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.images}>
        <div className={styles.container}>
          <img
            className={styles.image}
            src="/img/hardt-studio-thumb-p-500.jpeg"
            alt="2"
          />
        </div>
        <div className={styles.containerHover}>
          <img
            className={styles.imageHover}
            src="/img/hardt-studio-h-p-1080.jpeg"
            alt="1"
          />
        </div>
      </div>
      <div className={styles.text}>
        <div>{project.title}</div>
        <div>{project.type}</div>
      </div>
    </div>
  );
}
