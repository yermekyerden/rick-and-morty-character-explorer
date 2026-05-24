import { APP_MESSAGES } from '../../constants/messages';
import styles from './AboutPage.module.css';

const RS_SCHOOL_REACT_COURSE_URL = 'https://rs.school/courses/reactjs';

function AboutPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="about-title">
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{APP_MESSAGES.about.kicker}</p>

            <h1 className={styles.title} id="about-title">
              {APP_MESSAGES.about.title}
            </h1>

            <p className={styles.lead}>{APP_MESSAGES.about.description}</p>
          </div>

          <div className={styles.portalCard} aria-hidden="true">
            <div className={styles.portalOrb}>
              <div className={styles.portalCore} />
            </div>

            <p className={styles.portalLabel}>
              {APP_MESSAGES.about.portalLabel}
            </p>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <section className={styles.infoCard} aria-labelledby="author-title">
            <p className={styles.cardKicker}>
              {APP_MESSAGES.about.authorKicker}
            </p>

            <h2 className={styles.cardTitle} id="author-title">
              {APP_MESSAGES.about.authorName}
            </h2>

            <p className={styles.text}>
              {APP_MESSAGES.about.authorDescription}
            </p>
          </section>

          <section className={styles.infoCard} aria-labelledby="course-title">
            <p className={styles.cardKicker}>
              {APP_MESSAGES.about.courseKicker}
            </p>

            <h2 className={styles.cardTitle} id="course-title">
              {APP_MESSAGES.about.courseTitle}
            </h2>

            <p className={styles.text}>
              {APP_MESSAGES.about.courseDescription}
            </p>

            <a
              className={styles.courseLink}
              href={RS_SCHOOL_REACT_COURSE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {APP_MESSAGES.about.courseLink}
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
