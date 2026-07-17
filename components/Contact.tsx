export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Let&apos;s build something together</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <div className="contact-info" style={{ flex: 1, minWidth: 250, textAlign: "center" }}>
            <h3>Contact Information</h3>
            <p>
              <i className="fas fa-envelope"></i> brendanchoi0626@gmail.com
            </p>
            <p>
              <i className="fas fa-phone"></i> +64 22 036 8384
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> Auckland, New Zealand
            </p>
          </div>

          <div className="contact-info" style={{ flex: 1, minWidth: 250, textAlign: "center" }}>
            <h3>Connect With Me</h3>
            <div
              style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "1rem" }}
            >
              <a
                href="https://linkedin.com/in/manseung-choi-0447b4223"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/mcho868"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://instagram.com/brendanchoi_"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCd84sDYJbtcSd1VVg0Tb2HQ"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
