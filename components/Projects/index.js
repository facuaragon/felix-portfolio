import styles from "./projects.module.css";
import ProjectCard from "../ProjectCard";
import Project from "@/models/project";
import Proyecto from "../proyecto";

const getProjects = async () => {
  try {
    const res = await fetch(`/api/projects`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Projects({ projects }) {
  const response = await getProjects();
  let projectsList;
  function compareFn(a, b) {
    if (a.priorityNumber < b.priorityNumber) {
      return -1;
    } else if (a.priorityNumber > b.priorityNumber) {
      return 1;
    }
    return 0;
  }
  if (response && response.projects) {
    projectsList = response.projects;
    projectsList.sort(compareFn);
    // console.log("projects: ", projectsList);
  }
  // else console.log(response);
  return (
    <section className={styles.projects}>
      <div className={styles.line}></div>
      <div className={styles.header}>
        <ul>
          <li>selected projects</li>
        </ul>
      </div>
      <div className={styles.projectCards}>
        {projectsList?.map((project) => (
          <Proyecto key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
