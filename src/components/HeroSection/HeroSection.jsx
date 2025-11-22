// src/components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  BookOpen,
  LaptopMinimal,
  IndianRupee,
} from "lucide-react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Franchise Operations",
    "Student Enrollment",
    "Revenue Growth",
    "Partner Network",
  ];
  const currentText = texts[currentIndex];

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentText, texts.length]);

  return (
    <section className={styles.heroSection}>
      {/* Background with subtle pattern */}
      {/* <div className={styles.backgroundPattern}>sadfasdfasfda</div> */}

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Main Heading with Typing Effect */}
          <div className={styles.heading}>
            <h1 className={styles.mainTitle}>
              Transform Your
              <br />
              <span className={styles.typingText}>
                {displayedText}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            All-in-one platform to streamline operations, boost enrollments, and
            drive sustainable growth for your franchise network.
          </p>

          {/* Key Metrics */}
          <div className={styles.metrics}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>300%</div>
              <div className={styles.metricLabel}>Faster Growth</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>98%</div>
              <div className={styles.metricLabel}>Success Rate</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>50+</div>
              <div className={styles.metricLabel}>Franchises</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.actions}>
            <button className={styles.primaryButton}>
              <span>Explore Franchise Opportunity</span>
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryButton}>
              <Play size={18} />
              <span>Partner & Earn</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <CheckCircle size={16} />
              <span>No Credit Card Required</span>
            </div>
            <div className={styles.trustItem}>
              <Shield size={16} />
              <span>Enterprise Security</span>
            </div>
            <div className={styles.trustItem}>
              <Users size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* New 3D Glass Visual Area */}
        <div className={styles.visual}>
          {/* Main Glass Container */}
          <div className={styles.glassContainer}>
            {/* Floating Icons with Animation */}
            <div className={styles.floatingIcon1}>
              <div className={styles.iconWrapper}>
                <Users className={styles.icon} />
              </div>
              <div className={styles.pulseRing}></div>
            </div>

            <div className={styles.floatingIcon2}>
              <div className={styles.iconWrapper}>
                <BookOpen className={styles.icon} />
              </div>
              <div className={styles.pulseRing}></div>
            </div>

            <div className={styles.floatingIcon3}>
              <div className={styles.iconWrapper}>
                <IndianRupee className={styles.icon} />
              </div>
              <div className={styles.pulseRing}></div>
            </div>

            <div className={styles.floatingIcon4}>
              <div className={styles.iconWrapper}>
                <LaptopMinimal className={styles.icon} />
              </div>
              <div className={styles.pulseRing}></div>
            </div>

            {/* Central Analytics Circle */}
            <div className={styles.analyticsCircle}>
              <div className={styles.circleInner}>
                <TrendingUp className={styles.analyticsIcon} />
                <span>Live Analytics</span>
              </div>
              <div className={styles.circleGlow}></div>
            </div>

            {/* Connection Lines */}
            <div className={styles.connectionLine1}></div>
            <div className={styles.connectionLine2}></div>
            <div className={styles.connectionLine3}></div>
            <div className={styles.connectionLine4}></div>

            {/* Floating Data Points */}
            <div className={styles.dataPoint1}>
              <span>1.2K+ Students</span>
            </div>
            <div className={styles.dataPoint2}>
              <span>₹28L Revenue</span>
            </div>
            <div className={styles.dataPoint3}>
              <span>85% Growth</span>
            </div>
            <div className={styles.dataPoint4}>
              <span>50+ Centers</span>
            </div>
          </div>

          {/* Background Glow Effects */}
          <div className={styles.glowEffect1}></div>
          <div className={styles.glowEffect2}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
