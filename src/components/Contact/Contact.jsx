import React, { useState } from "react";
import styles from "./Contact.module.css";
import api from "../../utils/axiosConfig";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null);

    function onChange(e) {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        try {
            // use your axios instance (api) which already has baseURL = import.meta.env.VITE_API_URL
            const res = await api.post("/contact", form);
            if (res?.data?.success) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Contact submit error:", err);
            setStatus("error");
        }
    }


    return (
        <div className={styles.contactContainer}>
            <div className={styles.backgroundEffects}>
                <div className={styles.glow1}></div>
                <div className={styles.glow2}></div>
                <div className={styles.glow3}></div>
            </div>

            <div className={styles.contactCard}>
                <div className={styles.infoPanel}>
                    <h2 className={styles.infoTitle}>Get in touch</h2>
                    <p className={styles.infoText}>
                        Have questions about Franchise Management? Drop us a message and our
                        team will get back to you.
                    </p>

                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <strong>Email: </strong>
                            <a href="mailto:hello@franchisepro.com" className={styles.infoLink}>
                                hello@franchisepro.com
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Phone: </strong>
                            <a href="tel:+911234567890" className={styles.infoLink}>
                                +91 12345 67890
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Address:</strong>
                            <div className={styles.infoLink}>123 FMS Lane, Mumbai, India</div>
                        </div>
                    </div>
                </div>

                <div className={styles.formPanel}>
                    <form className={styles.formCard} onSubmit={onSubmit}>
                        <h3 className={styles.formTitle}>Send a message</h3>
                        <p className={styles.formSubtitle}>We’ll get back within 24 hours.</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name</label>
                            <input
                                className={styles.input}
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                placeholder="Your full name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                className={styles.input}
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="you@company.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Message</label>
                            <textarea
                                className={styles.textarea}
                                name="message"
                                value={form.message}
                                onChange={onChange}
                                placeholder="Tell us about your enquiry..."
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </button>

                        {status === "success" && (
                            <div className={styles.success}>Message sent!</div>
                        )}
                        {status === "error" && (
                            <div className={styles.error}>Something went wrong</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
