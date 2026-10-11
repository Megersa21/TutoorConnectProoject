import { useLocation, Link } from 'react-router-dom';
import '../CssPages/BookingConfirmation.css';

function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state;

  if (!booking) {
    return (
      <main className="booking-confirmation">
        <h1>No booking details found</h1>
        <p>Please select a tutor and complete the booking form first.</p>
        <Link to="/find-tutors" className="booking-btn">
          Find Tutors
        </Link>
      </main>
    );
  }

  return (
    <main className="booking-confirmation">
      <div className="booking-card">
        <div className="booking-icon">✓</div>

        <h1>Booking Request Summary</h1>
        <p className="booking-subtitle">
          Review your lesson details before continuing.
        </p>

        <div className="booking-status">Status: Pending confirmation</div>

        <div className="booking-details">
          <div>
            <span>Tutor</span>
            <strong>{booking.tutorName}</strong>
          </div>

          <div>
            <span>Lesson day</span>
            <strong>{booking.selectedDay}</strong>
          </div>

          <div>
            <span>Lesson time</span>
            <strong>{booking.selectedTime}</strong>
          </div>

          <div>
            <span>Grade</span>
            <strong>{booking.learnerGrade}</strong>
          </div>

          <div>
            <span>Lesson mode</span>
            <strong>{booking.mode}</strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>{booking.duration} hour(s)</strong>
          </div>

          <div>
            <span>Total price</span>
            <strong>{booking.total} ETB</strong>
          </div>
        </div>

        <div className="booking-message">
          <strong>Message to tutor</strong>
          <p>{booking.learnerMessage || 'No message provided.'}</p>
        </div>

        <p className="booking-note">
          This is a frontend demo. Your booking has not been saved or sent to
          the tutor yet.
        </p>

        <div className="booking-actions">
          <Link to="/find-tutors" className="booking-btn">
            Find Another Tutor
          </Link>

          <Link
            to={`/tutors/${booking.tutorId}`}
            className="booking-btn secondary"
          >
            Back to Tutor Profile
          </Link>
        </div>
      </div>
    </main>
  );
}

export default BookingConfirmation;
