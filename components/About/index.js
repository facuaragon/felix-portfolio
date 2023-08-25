import styles from "./about.module.css";

const getProfile = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/profile`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Profile");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
export default async function About() {
  const response = await getProfile();
  let profile;
  if (response && response.profile) {
    profile = response.profile;
  }
  return (
    <section className={styles.about}>
      <div className={styles.heading}>
        <div className={styles.name}>{profile?.name}</div>
        <div className={styles.label}>{profile?.job}</div>
      </div>
      <div className={styles.description}>{profile?.description}</div>
    </section>
  );
}
