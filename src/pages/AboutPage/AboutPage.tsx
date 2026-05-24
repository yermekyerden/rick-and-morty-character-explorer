import styles from './AboutPage.module.css';

const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';

function AboutPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="about-title">
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Portal Lab Archive</p>

            <h1 className={styles.title} id="about-title">
              About Character Explorer
            </h1>

            <p className={styles.lead}>
              Character Explorer opens a small portal into the Rick and Morty
              API. It helps you search characters, inspect results, and keep
              your last search coordinates in this browser.
            </p>
          </div>

          <div className={styles.portalCard} aria-hidden="true">
            <div className={styles.portalOrb}>
              <div className={styles.portalCore} />
            </div>

            <p className={styles.portalLabel}>Archive signal stable</p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <section className={styles.infoCard} aria-labelledby="author-title">
            <p className={styles.cardKicker}>Author dossier</p>

            <h2 className={styles.cardTitle} id="author-title">
              Yermek Yerdenov
            </h2>

            <p className={styles.text}>
              A software engineer from Kazakhstan who likes to code, solve
              puzzles, play chess, and build things for fun.
            </p>
          </section>

          <section className={styles.infoCard} aria-labelledby="course-title">
            <p className={styles.cardKicker}>Training signal</p>

            <h2 className={styles.cardTitle} id="course-title">
              Rolling Scopes School
            </h2>

            <p className={styles.text}>
              This project is part of the RS School React course, built as a
              small character archive with a portal-themed interface.
            </p>

            <a
              className={styles.courseLink}
              href={RS_SCHOOL_REACT_COURSE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open RS School React course
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
