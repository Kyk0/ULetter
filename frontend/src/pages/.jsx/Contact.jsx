import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt, faClock, faEnvelope, faCalendarAlt, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Contact() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Contact Us</h1>

      <div style={styles.section}>
        <h2 style={styles.heading}>Contact Information</h2>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
          <p style={styles.text}>
            Email:{" "}
            <a
              href="mailto:support@uletter.com"
              style={styles.link}
              title="Send an email to support@uletter.com"
            >
              support@uletter.com
            </a>
          </p>
        </div>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faPhone} style={styles.icon} />
          <p style={styles.text}>Phone: +1 234 567 890</p>
        </div>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
          <p style={styles.text}>Address: 1234 ULetter St, Tech City, USA</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Support Details</h2>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <p style={styles.text}>
            Working Hours: Mon-Fri, 9:00 AM - 5:00 PM
          </p>
        </div>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faHourglassHalf} style={styles.icon} />
          <p style={styles.text}>
            Estimated Response Time: Within 24 hours (on business days)
          </p>
        </div>
        <div style={styles.infoRow}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
          <p style={styles.text}>
            Holiday Schedule: Limited support on public holidays
          </p>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Connect With Us</h2>
        <div style={styles.buttonGroup}>
          <a
            href="https://facebook.com/uletter"
            style={styles.button}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} style={styles.buttonIcon} />
            Facebook
          </a>
          <a
            href="https://twitter.com/uletter"
            style={styles.button}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} style={styles.buttonIcon} />
            Twitter
          </a>
          <a
            href="/feedback"
            style={styles.button}
          >
            <FontAwesomeIcon icon={faEnvelope} style={styles.buttonIcon} />
            Feedback
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Roboto', Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "50px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  section: {
    margin: "20px 0",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    color: "#2c3e50",
    fontSize: "1.8rem",
    marginBottom: "15px",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "10px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    fontSize: "1.5rem",
    marginRight: "10px",
    color: "#555",
  },
  text: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#555",
  },
  link: {
    color: "#0073e6",
    textDecoration: "none",
    fontWeight: "500",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
    marginTop: "10px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 15px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#000000",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  buttonIcon: {
    marginRight: "8px",
    fontSize: "1.2rem",
  },
};

export default Contact;








