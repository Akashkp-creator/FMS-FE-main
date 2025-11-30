// src/components/Footer.jsx
import React from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Heart,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const solutions = [
    { name: "For Franchises", href: "#franchises" },
    { name: "For Managers", href: "#managers" },
    { name: "For Partners", href: "#partners" },
    { name: "For Admins", href: "#admins" },
    { name: "Case Studies", href: "#cases" },
  ];

  const resources = [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "API Status", href: "#status" },
    { name: "Blog", href: "#blog" },
    { name: "Community", href: "#community" },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", name: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", name: "Twitter" },
    { icon: <Linkedin size={20} />, href: "#", name: "LinkedIn" },
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" },
  ];

  return (
    <footer className={styles.footer}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        {/* Company Info */}
        <div className={styles.companySection}>
          <div className={styles.logo}>
            {/* <Building2 className={styles.logoIcon} /> */}
            {/* <span className={styles.logoText}>UPL Partner</span> */}
            <img
              src="https://www.snipe.co.in/img/logo.png"
              alt="Snipe Tech Pvt Ltd"
            />
          </div>
          <p className={styles.companyDescription}>
            Transform your franchise management with our all-in-one platform.
            Streamline operations, boost enrollments, and drive sustainable
            growth.
          </p>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>hello@franchisepro.com</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <span>
                123 Business Ave, Suite 100
                <br />
                New York, NY 10001
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.name}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.linksList}>
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={styles.footerLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Solutions</h3>
          <ul className={styles.linksList}>
            {solutions.map((solution) => (
              <li key={solution.name}>
                <a href={solution.href} className={styles.footerLink}>
                  {solution.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Resources</h3>
          <ul className={styles.linksList}>
            {resources.map((resource) => (
              <li key={resource.name}>
                <a href={resource.href} className={styles.footerLink}>
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletterSection}>
          <h3 className={styles.sectionTitle}>Stay Updated</h3>
          <p className={styles.newsletterText}>
            Get the latest news and updates about franchise management.
          </p>
          <form className={styles.newsletterForm}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <div className={styles.copyright}>
            <p>
              © 2025 Snipe IT Solutions. Made with <Heart size={14} /> for
              better franchise management.
            </p>
          </div>

          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>
              Privacy Policy
            </a>
            <a href="#terms" className={styles.legalLink}>
              Terms of Service
            </a>
            <a href="#cookies" className={styles.legalLink}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className={styles.scrollToTop}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
