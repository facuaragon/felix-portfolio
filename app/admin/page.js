import Link from "next/link";
import styles from "./admin.module.css";
import Login from "@/components/Login/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <Login />
      {session && (
        <>
          <h1>Opciones de edicion</h1>
          <div className={styles.buttons}>
            <Link href="/admin/addProject">
              <button>Agregar Notas</button>
            </Link>
            <Link href="/admin/editProjects">
              <button>Editar Notas</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
