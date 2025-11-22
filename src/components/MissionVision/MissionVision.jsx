import { Target, Eye, Users } from "lucide-react";
import styles from "./MissionVision.module.css";

const MissionVision = () => {
  return (
    <div className={styles.missionVisionSection}>
      <h2 className={styles.subHeading}>Our Mission & Vision</h2>

      <p className={styles.missionIntro}>
        We are committed to creating an ecosystem where education meets
        innovation — ensuring that learning, management, and growth happen
        seamlessly together.
      </p>

      <div className={styles.missionCards}>
        <div className={styles.card}>
          <Target className={styles.icon} />
          <h3>Our Mission</h3>
          <p>
            To empower franchises, trainers, and students through digital
            transformation — enabling better collaboration, transparency, and
            measurable success.
          </p>
        </div>

        <div className={styles.card}>
          <Eye className={styles.icon} />
          <h3>Our Vision</h3>
          <p>
            To be the leading education technology ecosystem that bridges the
            gap between learning and real-world growth, powered by smart data
            and meaningful connections.
          </p>
        </div>

        <div className={styles.card}>
          <Users className={styles.icon} />
          <h3>Our Values</h3>
          <p>
            Integrity, collaboration, and excellence drive everything we do. We
            believe success grows when people grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
