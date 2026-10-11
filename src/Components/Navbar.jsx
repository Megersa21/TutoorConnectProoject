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
          <Link to="/">Home</Link>
          <Link to="/find-tutors">Find Tutors</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="site-header-actions">
          <Link to="/login" className="nav-login">
            Log in
          </Link>
          <Link to="/register" className="nav-register">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
