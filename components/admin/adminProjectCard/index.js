import styles from "./adminProjectCard.module.css";

export default function AdminProjectCard({ project }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.link2}
        style={{
          backgroundImage: ` linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.4)), url("${project.image}")`,
        }}
      >
        <div className={styles.texto1}>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.subtitle}>{project.company}</div>
          <div className={styles.description}>{project.description}</div>
          {project.url && (
            <a href={project.url} target="_blank" className={styles.acceso}>
              + ir al articulo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
