import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../App.css';

const subjects = [
  'Mathematics',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'Other Course',
  'Information Communication and Technology (ICT)',
  'General Science',
  'History',
  'Geography',
  'Amharic',
  'Afaan Oromoo',
  'Economics',
  'Drawing',
  'Early learning',
  'Programing',
];

const tutors = [
  {
    initials: 'HT',
    name: 'Hanna Tesfaye',
    subject: 'Mathematics · Grades 6–10',
    rating: '4.9',
    reviews: 38,
    price: 250,
  },
  {
    initials: 'DA',
    name: 'Dawit Alemu',
    subject: 'Physics, Chemistry · Grades 9–12',
    rating: '4.8',
    reviews: 52,
    price: 320,
  },
  {
    initials: 'SB',
    name: 'Selam Bekele',
    subject: 'English · Grades 0–6',
    rating: '4.9',
    reviews: 27,
    price: 200,
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              ✓ Verified tutors · Grade 0 to Grade 12
            </span>

            <h1>
              Find a tutor you can trust, for every <span>grade.</span>
            </h1>

            <p>
              Compare verified tutors by subject, grade, price and availability.
              Book a lesson, message safely and pay, all in one place.
            </p>

            <div className="hero-actions">
              <Link to="/find-tutors" className="primary-btn">
                Find a tutor
              </Link>
              <a href="#become-tutor" className="secondary-btn">
                Become a tutor
              </a>
            </div>
          </div>

          <div className="search-card" id="find-tutors">
            <h2>What do you need help with?</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();

                const form = event.currentTarget;
                const subject = form.querySelector('#subject').value;
                const grade = form.querySelector('#grade').value;
                const mode = form.querySelector('#mode').value;

                const params = new URLSearchParams();

                if (subject) params.set('subject', subject);
                if (grade) params.set('grade', grade);
                if (mode) params.set('mode', mode);

                navigate(`/find-tutors?${params.toString()}`);
              }}
            >
              <label htmlFor="subject">Subject</label>
              <select id="subject" defaultValue="">
                <option value="">Choose a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <label htmlFor="grade">Grade</label>
              <select id="grade" defaultValue="">
                <option value="">Choose a grade</option>
                {Array.from({ length: 13 }, (_, index) => (
                  <option key={index} value={index}>
                    Grade {index}
                  </option>
                ))}
              </select>

              <label htmlFor="mode">Learning mode</label>
              <select id="mode" defaultValue="">
                <option value="">Any learning mode</option>
                <option>Online</option>
                <option>In-person</option>
                <option>Hybrid</option>
              </select>

              <button type="submit" className="primary-btn search-btn">
                Search tutors →
              </button>
            </form>
          </div>
        </section>

        <section className="subjects-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Explore learning</span>
              <h2>Popular subjects</h2>
            </div>
          </div>

          <div className="subjects-list">
            {subjects.map((subject) => (
              <Link
                to={`/find-tutors?subject=${encodeURIComponent(subject)}`}
                className="subject-chip"
                key={subject}
              >
                {subject}
              </Link>
            ))}
          </div>
        </section>

        <section className="steps-section" id="how-it-works">
          <div className="section-heading centered">
            <span className="eyebrow">Simple and transparent</span>
            <h2>How TutorConnect works</h2>
            <p>
              From first search to feedback, every step is clear and recorded.
            </p>
          </div>

          <div className="steps-grid">
            {[
              [
                '01',
                'Tell us what you need',
                'Choose subject, grade, mode and schedule.',
              ],
              [
                '02',
                'Compare verified tutors',
                'See qualifications, price, availability and reviews.',
              ],
              [
                '03',
                'Book a lesson',
                'Pick a free slot and review the price before confirming.',
              ],
              [
                '04',
                'Learn and review',
                'Attend, pay and rate the session when it is complete.',
              ],
            ].map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="safety-section" id="safety">
          <div className="safety-intro">
            <span className="eyebrow">Safety comes first</span>
            <h2>Built around child safety.</h2>
            <p>
              Learners are minors, so safety comes first. Guardians stay in
              control and every report creates a trackable case.
            </p>
            <Link to="/find-tutors?verified=true" className="primary-btn">
              See verified tutors
            </Link>
          </div>

          <div className="safety-features">
            <article>
              <span>✓</span>
              <div>
                <h3>Verified tutors</h3>
                <p>
                  Identity and qualification evidence is reviewed by an
                  administrator.
                </p>
              </div>
            </article>
            <article>
              <span>♧</span>
              <div>
                <h3>Guardian control</h3>
                <p>Guardians manage learner accounts and approve bookings.</p>
              </div>
            </article>
            <article>
              <span>✉</span>
              <div>
                <h3>Safe messaging</h3>
                <p>Messages stay on the platform and can be reported.</p>
              </div>
            </article>
            <article>
              <span>⌖</span>
              <div>
                <h3>Private locations</h3>
                <p>A learner’s exact home address is never shown to tutors.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="tutors-section" id="tutor-results">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Learn from the best</span>
              <h2>Meet some of our tutors</h2>
            </div>
            <Link to="/find-tutors" className="text-link">
              Browse all tutors →
            </Link>
          </div>

          <div className="tutors-grid">
            {tutors.map((tutor) => (
              <article className="tutor-card" key={tutor.name}>
                <div className="tutor-top">
                  <div className="avatar">{tutor.initials}</div>
                  <span className="verified">✓ Verified</span>
                </div>

                <h3>{tutor.name}</h3>
                <p className="tutor-subject">{tutor.subject}</p>

                <div className="tutor-bottom">
                  <span className="rating">
                    ★ {tutor.rating} ({tutor.reviews} reviews)
                  </span>
                  <strong>
                    {tutor.price} ETB<span>/hr</span>
                  </strong>
                </div>

                <button
                  className="secondary-btn full-width"
                  onClick={() => navigate(`/tutors/${tutor.id}`)}
                >
                  View tutor profile →
                </button>
              </article>
            ))}
          </div>

          <p className="demo-note">
            Sample tutor profiles for design purposes.
          </p>
        </section>

        <section className="become-tutor" id="become-tutor">
          <div>
            <span className="eyebrow">Share your knowledge</span>
            <h2>Are you a tutor?</h2>
            <p>
              Build a professional profile, set your own availability and price,
              and reach learners and guardians looking for your subjects.
            </p>
          </div>
          <button className="primary-btn" onClick={() => navigate('/register')}>
            Create tutor profile →
          </button>
        </section>
      </main>
    </div>
  );
}

export default Home;
