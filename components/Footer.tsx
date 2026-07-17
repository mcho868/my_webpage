export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Brendan Manseung Choi. All rights reserved.</p>
          <a className="footer-link" href="/document/MINDSET/">
            DOCUMENTS
          </a>
        </div>
      </div>
    </footer>
  );
}
