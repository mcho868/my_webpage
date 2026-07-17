export default function About() {
  return (
    <section id="about" className="section alternating-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
            I&apos;m a Computer Science graduate from the University of Auckland with
            First Class Honours (GPA 8.063/9), specializing in Machine Learning, AI,
            and large-scale software development. My journey in tech has been driven
            by a genuine passion for creating innovative solutions using cutting-edge
            technologies.
          </p>
          <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
            Currently, I serve as Founding Engineer &amp; CTO for two startups—{" "}
            <a
              href="https://alignhealthtech.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--primary-color)", textDecoration: "none" }}
            >
              alignhealthtech.com
            </a>{" "}
            and{" "}
            <a
              href="https://aivolve.co.nz"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--primary-color)", textDecoration: "none" }}
            >
              aivolve.co.nz
            </a>
            —where I take AI-powered products from architecture to production,
            including a clinical AI system used by real patients.
          </p>
          <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
            Beyond coding, I&apos;m also a certified personal trainer (NASM), electric
            guitarist, and fitness enthusiast. These diverse interests help me maintain
            a balanced perspective and approach to problem-solving.
          </p>
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="/assets/resume.pdf" className="btn" download="Brendan_Choi_Resume.pdf">
              Download Resume
            </a>
            <a
              href="/assets/unofficial_academic_transcript.pdf"
              className="btn btn-outline"
              download="Brendan_Choi_Transcript.pdf"
            >
              Download Transcript
            </a>
          </div>
          <div className="contact-info" style={{ flex: 1, minWidth: 250, textAlign: "center" }}>
            <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem", marginTop: "2rem" }}>
              Find me online
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
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
                style={{ fontSize: "1.5rem", marginRight: "1rem" }}
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
