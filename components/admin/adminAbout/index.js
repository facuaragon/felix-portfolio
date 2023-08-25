import styles from "./adminAbout.module.css";

export default function AdminAbout({ profile }) {
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
