import styles from "./addProject.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminAddingCard from "@/components/admin/adminAddingCard";

export default async function AddProject() {
  const session = await getServerSession(authOptions);
  if (session) {
    return <AdminAddingCard />;
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
