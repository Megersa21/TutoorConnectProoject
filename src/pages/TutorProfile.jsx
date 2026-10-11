import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../CssPages/TutorProfile.css';

const tutors = {
  1: {
    name: 'Hanna Tesfaye',
    initials: 'HT',
    subjects: ['Mathematics'],
    grades: 'Grades 6 to 10',
    modes: ['Online', 'In-person'],
    rating: 4.9,
    reviews: 38,
    experience: 7,
    price: 250,
    verified: true,
    about:
      "I teach secondary school mathematics with a focus on understanding over memorising. Each lesson starts with the learner's current level, then builds toward exam confidence with short practice sets and clear feedback.",
    method:
      'Step-by-step explanations, worked examples, and a short summary note after each session.',
    qualifications: [
      'BSc Mathematics',
      'Teaching certificate',
      'Identity document reviewed by administrator',
    ],
  },
  2: {
    name: 'Yonas Girma',
    initials: 'YG',
    subjects: ['Mathematics', 'Physics'],
    grades: 'Grades 6 to 12',
    modes: ['Online'],
    rating: 4.7,
    reviews: 21,
    experience: 4,
    price: 220,
    verified: true,
    about:
      'I am an engineering graduate who enjoys helping learners understand difficult concepts through practical examples and regular practice.',
    method:
      'Real-world examples, guided exercises, and practice questions tailored to each learner.',
    qualifications: [
      'Engineering graduate',
      'Tutor experience: 4 years',
      'Identity verification reviewed',
    ],
  },
  3: {
    name: 'Meseret Kebede',
    initials: 'MK',
    subjects: ['Mathematics'],
    grades: 'Grades 5 to 9',
    modes: ['In-person'],
    rating: 4.8,
    reviews: 15,
    experience: 5,
    price: 280,
    verified: true,
    about:
      'I provide patient mathematics tutoring for middle-grade learners, helping them build confidence and strengthen their understanding.',
    method: 'Homework support, worked examples, and weekly progress notes.',
    qualifications: [
      'Mathematics tutor',
      'Tutor experience: 5 years',
      'Identity verification reviewed',
    ],
  },
  4: {
    name: 'Biruk Tadesse',
    initials: 'BT',
    subjects: ['Mathematics'],
    grades: 'Grades 6 to 9',
    modes: ['Online'],
    rating: 4.5,
    reviews: 4,
    experience: 1,
    price: 150,
    verified: false,
    about:
      'I offer affordable mathematics lessons for learners who need additional help with classroom topics and practice questions.',
    method: 'Simple explanations and guided practice.',
    qualifications: [
      'University student',
      'Tutor experience: 1 year',
      'Verification is pending',
    ],
  },
  5: {
    name: 'Dawit Alemu',
    initials: 'DA',
    subjects: ['Physics', 'Chemistry'],
    grades: 'Grades 9 to 12',
    modes: ['Online', 'Hybrid'],
    rating: 4.8,
    reviews: 52,
    experience: 6,
    price: 320,
    verified: true,
    about:
      'I help secondary school learners understand physics and chemistry through clear explanations, examples, and exam preparation.',
    method: 'Concept explanations, worked problems, and exam practice.',
    qualifications: [
      'Science tutor',
      'Tutor experience: 6 years',
      'Identity verification reviewed',
    ],
  },
  6: {
    name: 'Selam Bekele',
    initials: 'SB',
    subjects: ['English', 'Amharic'],
    grades: 'Grades 0 to 6',
    modes: ['Online', 'In-person'],
    rating: 4.9,
    reviews: 27,
    experience: 5,
    price: 200,
    verified: true,
    about:
      'I support younger learners as they develop their language, reading, writing, and communication skills.',
    method:
      'Reading activities, writing exercises, and age-appropriate learning tasks.',
    qualifications: [
      'Language tutor',
      'Tutor experience: 5 years',
      'Identity verification reviewed',
    ],
  },
};

const availableDays = [
  { day: 'Sat', date: '10' },
  { day: 'Sun', date: '11' },
  { day: 'Mon', date: '12' },
  { day: 'Tue', date: '13' },
  { day: 'Wed', date: '14' },
];

const availableTimes = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

function TutorProfile() {
  const { id } = useParams();
  const tutor = tutors[id] || tutors['1'];

  const [selectedDay, setSelectedDay] = useState('Sat');
  const [selectedTime, setSelectedTime] = useState('');
  const [mode, setMode] = useState(tutor.modes[0]);
  const [duration, setDuration] = useState('1');
  const [learnerGrade, setLearnerGrade] = useState('8');
  const [bookingMessage, setBookingMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = tutor.price * Number(duration);

  function handleBooking(event) {
    event.preventDefault();

    if (!selectedTime) {
      setBookingMessage('Please select an available lesson time.');
      setShowConfirmation(false);
      return;
    }

    setBookingMessage(
      `Demo booking request: ${tutor.name}, ${selectedDay} ${selectedTime}, Grade ${learnerGrade}, ${mode}, ${duration} hour(s). Total: ${total} ETB.`,
    );
    setShowConfirmation(true);
  }

  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="logo">
          Tutor<span>Connect</span>
        </Link>

        <nav className="nav-links">
          <Link to="/find-tutors">Find a tutor</Link>
          <a href="/#how-it-works">How it works</a>
          <a href="/#safety">Safety</a>
          <a href="/#become-tutor">For tutors</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-btn">
            Log in
          </Link>
          <Link to="/signup" className="primary-btn">
            Sign up
          </Link>
        </div>
      </header>

      <main className="profile-page">
        <Link to="/find-tutors" className="back-link">
          ← Back to results
        </Link>

        <div className="profile-layout">
          <section className="profile-main">
            <article className="profile-intro">
              <div className="profile-avatar">{tutor.initials}</div>

              <div className="profile-intro-info">
                <div className="find-tutor-name">
                  <h1>{tutor.name}</h1>
                  {tutor.verified ? (
                    <span className="verified">✓ Verified</span>
                  ) : (
                    <span className="pending-badge">Verification pending</span>
                  )}
                </div>

                <p>
                  {tutor.subjects.join(', ')} · {tutor.grades} ·{' '}
                  {tutor.modes.join(' and ')}
                </p>

                <div className="find-meta">
                  <span>
                    ★ {tutor.rating} ({tutor.reviews} reviews)
                  </span>
                  <span>{tutor.experience} years experience</span>
                </div>
              </div>
            </article>

            <section className="profile-section">
              <h2>About</h2>
              <p>{tutor.about}</p>

              <h3>Teaching method</h3>
              <p>{tutor.method}</p>
            </section>

            <section className="profile-section">
              <h2>Subjects and grades</h2>

              <div className="profile-tags">
                {tutor.subjects.map((subject) => (
                  <span key={subject}>{subject}</span>
                ))}
                <span>{tutor.grades}</span>
              </div>
            </section>

            <section className="profile-section">
              <h2>Qualifications</h2>

              <ul className="qualification-list">
                {tutor.qualifications.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>

              <p className="demo-note">
                Sample qualifications for demonstration. Real credentials must
                be reviewed by an administrator.
              </p>
            </section>

            <section className="profile-section">
              <h2>Reviews</h2>
              <p className="review-policy">
                Only learners and guardians with completed sessions can review.
              </p>

              <article className="review-card">
                <div className="review-heading">
                  <strong>Guardian of a Grade 8 learner</strong>
                  <span>★ 5.0</span>
                </div>
                <p>
                  Clear, patient and always on time. The explanations were very
                  helpful.
                </p>
                <button
                  className="report-review"
                  onClick={() =>
                    alert('Review reporting will be connected later.')
                  }
                >
                  Report this review
                </button>
              </article>

              <article className="review-card">
                <div className="review-heading">
                  <strong>Guardian of a Grade 9 learner</strong>
                  <span>★ 4.8</span>
                </div>
                <p>Good explanations and helpful notes after each lesson.</p>
                <button
                  className="report-review"
                  onClick={() =>
                    alert('Review reporting will be connected later.')
                  }
                >
                  Report this review
                </button>
              </article>
            </section>
          </section>

          <aside className="booking-card">
            <div className="booking-price">
              <strong>{tutor.price} ETB</strong>
              <span>/ hour</span>
            </div>

            <h2>Book a session</h2>

            <form onSubmit={handleBooking}>
              <label htmlFor="service-mode">Service mode</label>
              <select
                id="service-mode"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                {tutor.modes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label>Choose a day</label>
              <div className="day-picker">
                {availableDays.map((item) => (
                  <button
                    key={item.day}
                    type="button"
                    className={
                      selectedDay === item.day
                        ? 'day-option active'
                        : 'day-option'
                    }
                    onClick={() => {
                      setSelectedDay(item.day);
                      setSelectedTime('');
                      setShowConfirmation(false);
                    }}
                  >
                    <span>{item.day}</span>
                    <strong>{item.date}</strong>
                  </button>
                ))}
              </div>

              <label>Available times</label>
              <div className="time-picker">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={
                      selectedTime === time
                        ? 'time-option active'
                        : 'time-option'
                    }
                    onClick={() => {
                      setSelectedTime(time);
                      setShowConfirmation(false);
                      setBookingMessage('');
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <label htmlFor="learner-grade">Learner's grade</label>
              <select
                id="learner-grade"
                value={learnerGrade}
                onChange={(event) => setLearnerGrade(event.target.value)}
              >
                {Array.from({ length: 13 }, (_, index) => (
                  <option key={index} value={index}>
                    Grade {index}
                  </option>
                ))}
              </select>

              <label htmlFor="session-duration">Session duration</label>
              <select
                id="session-duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </select>

              <div className="booking-summary">
                <span>Session</span>
                <strong>
                  {selectedDay}{' '}
                  {availableDays.find((day) => day.day === selectedDay)?.date}{' '}
                  Oct · {selectedTime || 'Choose a time'}
                </strong>

                <span>Duration</span>
                <strong>
                  {duration} {Number(duration) === 1 ? 'hour' : 'hours'}
                </strong>

                <span>Total due</span>
                <strong>{total} ETB</strong>
              </div>

              <p className="cancellation-note">
                Review the cancellation rules before confirming a real booking.
              </p>

              <button type="submit" className="primary-btn booking-submit">
                Request booking
              </button>

              {bookingMessage && (
                <div
                  className={
                    showConfirmation
                      ? 'booking-feedback success'
                      : 'booking-feedback error'
                  }
                  role="status"
                >
                  {bookingMessage}
                  {showConfirmation && (
                    <p>
                      This is a frontend demonstration only. No booking has been
                      sent to a tutor.
                    </p>
                  )}
                </div>
              )}

              <p className="booking-footnote">
                A real booking will need tutor confirmation before payment.
              </p>
            </form>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default TutorProfile;
