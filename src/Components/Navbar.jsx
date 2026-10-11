import ScrollToTopLink from './ScrollToTopLink.jsx';
import { Link } from 'react-router-dom';
import '../CssPages/Navbar.css';

function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          Tutor<span>Connect</span>
        </Link>

        <nav className="site-nav">
          <ScrollToTopLink to="/">Home</ScrollToTopLink>
          <ScrollToTopLink to="/find-tutors">Find Tutors</ScrollToTopLink>
          <ScrollToTopLink to="/how-it-works">How it works</ScrollToTopLink>
          <ScrollToTopLink to="/about">About</ScrollToTopLink>
          <ScrollToTopLink to="/contact">Contact</ScrollToTopLink>
        </nav>

        <div className="site-header-actions">
          <Link to="/login" className="nav-login">
            Log in
          </Link>
          <Link to="/register" className="nav-register">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
