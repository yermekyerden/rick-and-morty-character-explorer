import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <p className={styles.kicker}>Portal Lab Archive</p>

        <h1 className={styles.title}>About Character Explorer</h1>

        <p className={styles.text}>
          Character Explorer is a React training project built for the RS School
          React course. It uses the Rick and Morty API to practice routing,
          hooks, API state, pagination, and production-like component structure.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
