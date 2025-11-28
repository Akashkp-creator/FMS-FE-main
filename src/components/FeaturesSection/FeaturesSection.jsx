import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Users,
  FileText,
  BarChart2,
  ShieldCheck,
  Phone
} from "lucide-react";
import styles from "./FeaturesSection.module.css";

export default function FeaturesPage() {
  const features = [
    { icon: <Zap size={20} />, title: "Lead Capture", text: "Quickly add & track leads" },
    { icon: <Users size={20} />, title: "Team Management", text: "Assign tasks & roles" },
    { icon: <FileText size={20} />, title: "Enrollment", text: "Structured onboarding flow" },
    { icon: <BarChart2 size={20} />, title: "Insights", text: "Simple conversion reports" },
    { icon: <ShieldCheck size={20} />, title: "Secure Data", text: "Role-based access" },
    { icon: <Phone size={20} />, title: "Follow-ups", text: "Notes & communication" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.bgEffects}>
        <div className={styles.glowA} />
        <div className={styles.glowB} />
      </div>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Franchise Management — made simple</h1>
          <p className={styles.subtitle}>Capture leads, onboard partners and run operations from one clean dashboard.</p>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={styles.ctaPrimary}>Get Started</Link>
            <a href="#features" className={styles.ctaGhost}>See features</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section id="features" className={styles.features}>
          <div className={styles.grid}>
            {features.map((f, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.iconWrap}>{f.icon}</div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardText}>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaTextBlock}>
              <h2 className={styles.ctaHeading}>Ready to streamline your franchise operations?</h2>
              <p className={styles.ctaCopy}>
                Start a free demo or contact our team to set up your workspace.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link to="/contact" className={styles.ctaPrimary}>Contact Sales</Link>
              <Link to="/login" className={styles.ctaSecondary}>Sign In</Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
