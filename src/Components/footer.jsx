import ScrollToTopLink from './ScrollToTopLink';
import { Link } from 'react-router-dom';
import '../CssPages/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Tutor<span>Connect</span>
          </Link>

          <p>
            Connecting learners, guardians, and tutors to make personalized
            learning easier.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <ScrollToTopLink to="/">Home</ScrollToTopLink>
          <ScrollToTopLink to="/find-tutors">Find Tutors</ScrollToTopLink>
          <ScrollToTopLink to="/how-it-works">How It Works</ScrollToTopLink>
          <ScrollToTopLink to="/about">About Us</ScrollToTopLink>
        </div>

        <div className="footer-links">
          <h3>Account</h3>
          <Link to="/login">Log In</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-contact">
          <h3>Get in touch</h3>
          <p>Questions about TutorConnect?</p>
          <Link to="/contact" className="footer-contact-link">
            Contact our team
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TutorConnect. All rights reserved.</p>
        <p>Built to support better learning.</p>
      </div>
    </footer>
  );
}

export default Footer;
