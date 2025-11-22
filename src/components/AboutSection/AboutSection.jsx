import { Target, Eye, Users } from "lucide-react";
import styles from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <h2 className={styles.aboutTitle}>About Our Platform</h2>
        <p className={styles.aboutSubtitle}>
          Empowering education through technology and collaboration.
        </p>

        <p className={styles.aboutDescription}>
          Our platform connects <strong>Students</strong>,{" "}
          <strong>Trainers</strong>, and <strong>Franchises</strong> under one
          unified ecosystem. We believe in transparent growth, efficient
          communication, and real-time progress tracking.
          <br />
          <br />
          With advanced role-based access and automated workflows, we simplify
          operations—from lead generation to student enrollment and revenue
          management—so every partner can focus on creating value.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Active Franchises</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>10K+</h3>
            <p className={styles.statLabel}>Students Enrolled</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>500+</h3>
            <p className={styles.statLabel}>Trainers Onboarded</p>
          </div>
        </div>

        <div className={styles.imageContainer}>
          {/* <img src={aboutImg} alt="Our Team" className={styles.image} /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
