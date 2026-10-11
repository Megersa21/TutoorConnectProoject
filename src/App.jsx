import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import FindTutors from './pages/findtutors.jsx';
import TutorProfile from './pages/TutorProfile.jsx';
import GuardianDashboard from './pages/GuardianDashboard.jsx';
import TutorDashboard from './pages/tutorDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Auth from './pages/Auth.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/footer.jsx';
import ScrollTop from './Components/ScrollTop.jsx';
import BookingConfirmation from './pages/BookingConfrimation.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-tutors" element={<FindTutors />} />
        <Route path="/tutors/:id" element={<TutorProfile />} />
        <Route path="/guardian-dashboard" element={<GuardianDashboard />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
