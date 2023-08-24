import Link from "next/link";
import styles from "./editProjects.module.css";
import AdminEditProjectCard from "@/components/admin/adminEditProjectCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const getProjects = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/projects`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function EditProjects() {
  const session = await getServerSession(authOptions);
  if (session) {
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
    }

    return (
      <div className={styles.container}>
        <Link href="/admin" className={styles.goBack}>
          <button>Go Back to Admin Dashboard</button>
        </Link>
        <h3>Editar Notas</h3>

        {projectsList.map((project) => (
          <AdminEditProjectCard key={project._id} project={project} />
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h3>Yo are not logged in</h3>
        <Link href="/admin" className={styles.goBack}>
          <button>Go to Admin</button>
        </Link>
      </>
    );
  }
}
