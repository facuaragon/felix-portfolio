import styles from "./projects.module.css";
import ProjectCard from "../ProjectCard";
export default function Projects({ projects }) {
  return (
    <section className={styles.projects}>
      <div className={styles.line}></div>
      <div className={styles.header}>
        <ul>
          <li>selected projects</li>
        </ul>
      </div>
      <div className={styles.projectCards}>
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
