import styles from './AboutPage.module.css';

const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';

function AboutPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <p className={styles.kicker}>Portal Lab Archive</p>

        <h1 className={styles.title}>About Character Explorer</h1>

        <div className={styles.content}>
          <p className={styles.text}>
            Character Explorer opens a small portal into the Rick and Morty API.
            It helps you search characters, inspect results, and keep your last
            search coordinates in this browser.
          </p>

          <section className={styles.authorCard} aria-labelledby="author-title">
            <p className={styles.cardKicker}>Author dossier</p>

            <h2 className={styles.authorTitle} id="author-title">
              Yermek Yerdenov
            </h2>

            <p className={styles.text}>
              A software engineer from Kazakhstan who likes to code, solve
              puzzles, play chess, and build things for fun.
            </p>
          </section>

          <a
            className={styles.courseLink}
            href={RS_SCHOOL_REACT_COURSE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open RS School React course
          </a>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
